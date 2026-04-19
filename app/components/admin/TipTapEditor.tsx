'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
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
import { useCallback, useState } from 'react'
import { createClient } from '@/app/lib/supabase/client'

const lowlight = createLowlight()
lowlight.register('js', js)
lowlight.register('javascript', js)
lowlight.register('ts', ts)
lowlight.register('typescript', ts)
lowlight.register('css', css)
lowlight.register('bash', bash)

interface TipTapEditorProps {
  content?: Record<string, unknown> | null
  onChange?: (content: Record<string, unknown>) => void
  editable?: boolean
}

export default function TipTapEditor({ content, onChange, editable = true }: TipTapEditorProps) {
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [imageAlt, setImageAlt] = useState('')
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        link: false,
        underline: false,
      }),
      CodeBlockLowlight.configure({ lowlight }),
      Image.configure({ inline: false, allowBase64: true }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') return 'Heading...'
          return "Write something amazing... Use '/' for commands"
        },
      }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'blog-link' } }),
      Underline,
      Typography,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: content ?? undefined,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON() as Record<string, unknown>)
    },
    immediatelyRender: false,
  })

  const insertImage = useCallback(() => {
    if (!editor || !imageUrl) return
    editor.chain().focus().setImage({ src: imageUrl, alt: imageAlt || '' }).run()
    setImageUrl('')
    setImageAlt('')
    setShowImageDialog(false)
  }, [editor, imageUrl, imageAlt])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setUploadingImage(true)
    const supabase = createClient()
    const file = e.target.files[0]

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('Project Images')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Error uploading image:', uploadError)
        alert(`Error uploading ${file.name}: ${uploadError.message}`)
        return
      }

      const { data } = supabase.storage.from('Blog Images').getPublicUrl(filePath)
      if (data) {
        setImageUrl(data.publicUrl)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('An unexpected error occurred during upload')
    } finally {
      setUploadingImage(false)
      e.target.value = ''
    }
  }

  const setLink = useCallback(() => {
    if (!editor) return
    if (!linkUrl) {
      editor.chain().focus().unsetLink().run()
    } else {
      editor.chain().focus().setLink({ href: linkUrl }).run()
    }
    setLinkUrl('')
    setShowLinkDialog(false)
  }, [editor, linkUrl])

  if (!editor) return null

  const ToolbarButton = ({
    onClick,
    active,
    children,
    title,
  }: {
    onClick: () => void
    active?: boolean
    children: React.ReactNode
    title: string
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2 py-1.5 rounded text-sm transition-all ${active
          ? 'bg-white text-black'
          : 'text-gray-400 hover:text-white hover:bg-white/10'
        }`}
    >
      {children}
    </button>
  )

  return (
    <div className="relative">
      {/* Toolbar */}
      {editable && (
        <div className="sticky top-16 z-30 flex flex-wrap items-center gap-1 p-2 mb-2 bg-[#111] border border-white/10 rounded-xl backdrop-blur-md">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive('heading', { level: 1 })}
            title="Heading 1"
          >H1</ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >H2</ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive('heading', { level: 3 })}
            title="Heading 3"
          >H3</ToolbarButton>

          <div className="w-px h-5 bg-white/10 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title="Bold"
          ><strong>B</strong></ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title="Italic"
          ><em>I</em></ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive('underline')}
            title="Underline"
          ><span className="underline">U</span></ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
            title="Strikethrough"
          ><span className="line-through">S</span></ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive('code')}
            title="Inline Code"
          >{`</>`}</ToolbarButton>

          <div className="w-px h-5 bg-white/10 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            active={editor.isActive({ textAlign: 'left' })}
            title="Align Left"
          >←</ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            active={editor.isActive({ textAlign: 'center' })}
            title="Align Center"
          >↔</ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            active={editor.isActive({ textAlign: 'right' })}
            title="Align Right"
          >→</ToolbarButton>

          <div className="w-px h-5 bg-white/10 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title="Bullet List"
          >• List</ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title="Numbered List"
          >1. List</ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            title="Blockquote"
          >" Quote</ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive('codeBlock')}
            title="Code Block"
          >Code Block</ToolbarButton>

          <div className="w-px h-5 bg-white/10 mx-1" />

          <ToolbarButton
            onClick={() => {
              setLinkUrl(editor.getAttributes('link').href || '')
              setShowLinkDialog(true)
            }}
            active={editor.isActive('link')}
            title="Insert Link"
          >🔗 Link</ToolbarButton>
          <ToolbarButton
            onClick={() => setShowImageDialog(true)}
            title="Insert Image"
            active={false}
          >🖼 Image</ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Divider"
            active={false}
          >— Divider</ToolbarButton>
        </div>
      )}

      {/* Bubble menu on text selection */}
      {editable && (
        <BubbleMenu
          editor={editor}
          className="flex items-center gap-1 p-1 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl"
        >
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-2 py-1 rounded text-xs font-bold transition-all ${editor.isActive('bold') ? 'bg-white text-black' : 'text-white hover:bg-white/10'}`}
          >B</button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-2 py-1 rounded text-xs italic transition-all ${editor.isActive('italic') ? 'bg-white text-black' : 'text-white hover:bg-white/10'}`}
          >I</button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`px-2 py-1 rounded text-xs underline transition-all ${editor.isActive('underline') ? 'bg-white text-black' : 'text-white hover:bg-white/10'}`}
          >U</button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`px-2 py-1 rounded text-xs line-through transition-all ${editor.isActive('strike') ? 'bg-white text-black' : 'text-white hover:bg-white/10'}`}
          >S</button>
          <button
            type="button"
            onClick={() => {
              setLinkUrl(editor.getAttributes('link').href || '')
              setShowLinkDialog(true)
            }}
            className={`px-2 py-1 rounded text-xs transition-all ${editor.isActive('link') ? 'bg-white text-black' : 'text-white hover:bg-white/10'}`}
          >🔗</button>
        </BubbleMenu>
      )}

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="tiptap-editor"
      />

      {/* Image Dialog */}
      {showImageDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="font-heading text-lg font-bold mb-4">Insert Image</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-white file:text-black hover:file:bg-gray-100"
                />
                {uploadingImage && <div className="text-sm text-gray-400 mt-1">Uploading...</div>}
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Or Image URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30"
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && insertImage()}
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Alt Text (optional)</label>
                <input
                  type="text"
                  placeholder="Describe the image..."
                  value={imageAlt}
                  onChange={e => setImageAlt(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={insertImage}
                className="flex-1 bg-white text-black font-semibold py-2 rounded-lg text-sm hover:bg-gray-100 transition-all"
              >Insert</button>
              <button
                type="button"
                onClick={() => { setShowImageDialog(false); setImageUrl(''); setImageAlt('') }}
                className="flex-1 bg-white/5 text-gray-400 py-2 rounded-lg text-sm hover:bg-white/10 transition-all"
              >Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="font-heading text-lg font-bold mb-4">Insert Link</h3>
            <input
              type="url"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30"
              autoFocus
              onKeyDown={e => e.key === 'Enter' && setLink()}
            />
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={setLink}
                className="flex-1 bg-white text-black font-semibold py-2 rounded-lg text-sm hover:bg-gray-100 transition-all"
              >Set Link</button>
              <button
                type="button"
                onClick={() => { editor.chain().focus().unsetLink().run(); setShowLinkDialog(false) }}
                className="px-4 bg-red-500/10 text-red-400 py-2 rounded-lg text-sm hover:bg-red-500/20 transition-all"
              >Remove</button>
              <button
                type="button"
                onClick={() => { setShowLinkDialog(false); setLinkUrl('') }}
                className="flex-1 bg-white/5 text-gray-400 py-2 rounded-lg text-sm hover:bg-white/10 transition-all"
              >Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
