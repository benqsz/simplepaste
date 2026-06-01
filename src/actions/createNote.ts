'use server'

import { sanitize } from 'isomorphic-dompurify'
import slugify from 'slugify'

import { db } from '@/db'
import { notes } from '@/db/schema'

type Props = {
  content: string
  customUrl?: string
}

export const createNote = async ({ content, customUrl }: Props) => {
  if (!content) {
    return {
      success: false as const,
      error: 'Content of note cannot be empty',
    }
  }

  const cleanUrl = customUrl
    ? slugify(customUrl, {
        lower: true,
        strict: true,
        trim: true,
      })
    : null

  const cleanContent = sanitize(content)

  if (cleanUrl) {
    const isUrlExists = await db.query.notes.findFirst({
      where: (notes, { eq }) => eq(notes.customUrl, cleanUrl),
    })

    if (isUrlExists?.id)
      return {
        success: false as const,
        error: 'Custom URL already exists',
      }
  }

  try {
    const [note] = await db
      .insert(notes)
      .values({ content: cleanContent, customUrl: cleanUrl })
      .returning({ id: notes.id, customUrl: notes.customUrl })

    return {
      success: true as const,
      data: note,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false as const,
      error: 'Unknown error occurred',
    }
  }
}
