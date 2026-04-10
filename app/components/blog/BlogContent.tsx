'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Typography from '@tiptap/extension-typography'
import TextAlign from '@tiptap/extension-text-align'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight } from 'lowlight'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import css from 'highlight.js/lib/languages/css'
import bash from 'highlight.js/lib/languages/bash'

const lowlight = createLowlight()
lowlight.register('js', js)
lowlight.register('javascript', js)
lowlight.register('ts', ts)
lowlight.register('typescript', ts)
lowlight.register('css', css)
lowlight.register('bash', bash)

interface BlogContentProps {
  content: Record<string, unknown>
}

export function BlogContent({ content }: BlogContentProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
      Image.configure({ inline: false }),
      Link.configure({ openOnClick: true, HTMLAttributes: { class: 'blog-link' } }),
      Underline,
      Typography,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
    editable: false,
    immediatelyRender: false,
  })

  return (
    <EditorContent editor={editor} className="tiptap-editor tiptap-readonly" />
  )
}
