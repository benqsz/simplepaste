import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MAX_URL_LENGTH = 32 as const

export const createNoteSchema = z.object({
  content: z.string().min(1, 'Content cannot be empty'),
  customUrl: z
    .string()
    .max(MAX_URL_LENGTH)
    .regex(
      /^[\w-]+$/,
      'Only letters, numbers, hyphens, and underscores allowed',
    )
    .or(z.literal(''))
    .transform(v => (v === '' ? undefined : v))
    .optional(),
  showCreatedAt: z.boolean(),
  showViews: z.boolean(),
  deleteAfterViews: z.coerce
    .number()
    .int()
    .or(z.literal(''))
    .transform(v => (v === '' ? undefined : v))
    .optional(),
})
