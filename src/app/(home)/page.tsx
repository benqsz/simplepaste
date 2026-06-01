'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Md } from '@/components/ui/md'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { createNote } from '@/app/(home)/_actions/createNote'

export default function Home() {
  const [text, setText] = useState('')
  const router = useRouter()

  const onCreate = async () => {
    const id = await createNote(text)
    router.push(`/${id}`)
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
        <TabsContent value="options">options</TabsContent>
      </Tabs>
    </Container>
  )
}
