'use server'

import { sanitize } from 'isomorphic-dompurify'
import { nanoid } from 'nanoid'
import slugify from 'slugify'
import { z } from 'zod'

import { createNoteSchema } from '@/lib/utils'
import { db } from '@/db'
import { notes } from '@/db/schema'

export const createNote = async (props: z.infer<typeof createNoteSchema>) => {
  const parsedData = createNoteSchema.safeParse(props)
  if (!parsedData.success)
    return {
      success: false as const,
      error: 'Error validating note data',
    }

  const { content, customUrl, showCreatedAt, showViews, deleteAfterViews } =
    parsedData.data

  const slug = customUrl
    ? slugify(customUrl, {
        lower: true,
        strict: true,
        trim: true,
      })
    : nanoid(12)

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
      .returning({ slug: notes.slug })

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
