'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
  content: z.string().min(1),
  customUrl: z.string().max(MAX_URL_LENGTH).optional(),
})

export default function Home() {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      customUrl: '',
    },
    mode: 'onChange',
  })

  // eslint-disable-next-line react-hooks/incompatible-library
  const content = form.watch('content')
  const customUrl = form.watch('customUrl')

  const onCreate = async () => {
    console.log(content, customUrl)
    const res = await createNote({
      content,
      customUrl,
    })

    if (!res.success) {
      toast.error(res.error)
      return
    }

    const note = res.data
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
            className="w-full min-h-200"
            {...form.register('content')}
          />
        </TabsContent>
        <TabsContent value="preview">
          <Md content={content} className="min-h-200" />
        </TabsContent>
        <TabsContent value="options">
          <FieldSet>
            <FieldGroup>
              <Controller
                name="customUrl"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="max-w-sm">
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
