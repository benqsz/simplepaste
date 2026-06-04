'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createNoteSchema, MAX_URL_LENGTH } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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

export default function Home() {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      content: '',
      customUrl: '',
      showCreatedAt: true,
      showViews: true,
      deleteAfterViews: '',
    },
  })

  // eslint-disable-next-line react-hooks/incompatible-library
  const content = form.watch('content')

  const onSubmit = async (data: z.infer<typeof createNoteSchema>) => {
    const res = await createNote({
      ...data,
    })

    if (!res.success) {
      toast.error(res.error)
      return
    }

    router.push(`/${res.data}`)
  }

  return (
    <Container className="flex flex-col gap-4">
      <Tabs defaultValue="edit">
        <TabsList variant="line" className="mx-auto">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="options">Options</TabsTrigger>
          <Button onClick={form.handleSubmit(onSubmit)}>Create</Button>
        </TabsList>
        <TabsContent value="edit">
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  className="w-full min-h-[calc(100vh-120px)]"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </>
            )}
          />
        </TabsContent>
        <TabsContent value="preview">
          <Md content={content} className="min-h-[calc(100vh-120px)]" />
        </TabsContent>
        <TabsContent value="options">
          <FieldSet>
            <FieldGroup className="max-w-sm mx-auto">
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
              <Controller
                name="showCreatedAt"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation="horizontal"
                  >
                    <Checkbox
                      id={field.name}
                      name={field.name}
                      aria-invalid={fieldState.invalid}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FieldLabel htmlFor={field.name}>
                      Show created at timestamp
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="showViews"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation="horizontal"
                  >
                    <Checkbox
                      id={field.name}
                      name={field.name}
                      aria-invalid={fieldState.invalid}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FieldLabel htmlFor={field.name}>
                      Show views count
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="deleteAfterViews"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Delete after X views
                    </FieldLabel>
                    <Input
                      {...field}
                      value={field.value == null ? '' : String(field.value)}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
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
