'use server'

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

  if (customUrl) {
    const isUrlExists = await db.query.notes.findFirst({
      where: (notes, { eq }) => eq(notes.customUrl, customUrl),
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
      .values({ content, customUrl: customUrl?.trim() || null })
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
