'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Container } from '@/components/ui/container'
import { Md } from '@/components/ui/md'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'

export default function Home() {
  const [text, setText] = useState('')

  return (
    <div>
      <Container className="flex flex-col gap-4">
        <Typography variant="lead">Create new note</Typography>
        <Tabs defaultValue="edit" className="w-full">
          <TabsList variant="line">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="w-full">
            <Textarea
              className="h-200"
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </TabsContent>
          <TabsContent value="preview">
            <Md content={text} />
          </TabsContent>
        </Tabs>
        <ButtonGroup className="ml-auto">
          <Button variant="secondary">Options</Button>
          <Button>Create</Button>
        </ButtonGroup>
      </Container>
    </div>
  )
}
