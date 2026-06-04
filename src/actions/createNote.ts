'use server'

import { sanitize } from 'isomorphic-dompurify'
import { nanoid } from 'nanoid'
import slugify from 'slugify'

import { db } from '@/db'
import { notes } from '@/db/schema'

type Props = {
  content: string
  customUrl?: string
  showViews: boolean
  showCreatedAt: boolean
  deleteAfterViews?: number
}

export const createNote = async (props: Props) => {
  const { content, customUrl, showCreatedAt, showViews, deleteAfterViews } =
    props

  if (!content) {
    return {
      success: false as const,
      error: 'Content of note cannot be empty',
    }
  }

  const slug = customUrl
    ? slugify(customUrl, {
        lower: true,
        strict: true,
        trim: true,
      })
    : nanoid(12)

  if (slug === '') {
    return {
      success: false as const,
      error: 'Slug cannot be empty',
    }
  }

  const isUrlExists = await db.query.notes.findFirst({
    where: (notes, { eq }) => eq(notes.slug, slug),
  })

  if (isUrlExists?.id)
    return {
      success: false as const,
      error: 'Custom URL already exists',
    }

  const cleanContent = sanitize(content)

  try {
    const [note] = await db
      .insert(notes)
      .values({
        content: cleanContent,
        slug,
        showViews,
        showCreatedAt,
        deleteAfterViews: deleteAfterViews || null,
      })
      .returning({ id: notes.id, slug: notes.slug })

    return {
      success: true as const,
      data: note.slug,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false as const,
      error: 'Unknown error occurred',
    }
  }
}
