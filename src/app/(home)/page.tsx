'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { MAX_URL_LENGTH } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Md } from '@/components/ui/md'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { createNote } from '@/actions/createNote'

const formSchema = z.object({
  customUrl: z.string().max(MAX_URL_LENGTH).optional(),
})

export default function Home() {
  const [text, setText] = useState('')
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customUrl: '',
    },
  })

  const onCreate = async () => {
    const { customUrl } = form.getValues()
    const note = await createNote({
      content: text,
      customUrl,
    })
    router.push(`/${note.customUrl || note.id}`)
  }

  return (
    <Container className="flex flex-col gap-4">
      <Tabs defaultValue="edit">
        <TabsList variant="line">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="options">Options</TabsTrigger>
          <Button onClick={onCreate}>Create</Button>
        </TabsList>
        <TabsContent value="edit">
          <Textarea
            className="w-full h-200"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </TabsContent>
        <TabsContent value="preview">
          <Md content={text} />
        </TabsContent>
        <TabsContent value="options">
          <FieldSet>
            <FieldGroup>
              <Controller
                name="customUrl"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Custom URL</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      max={MAX_URL_LENGTH}
                      placeholder="If not provided will be random"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
        </TabsContent>
      </Tabs>
    </Container>
  )
}
