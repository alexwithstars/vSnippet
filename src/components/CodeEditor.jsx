import './CodeEditor.css'
import { useEffect, useRef } from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

export function CodeEditor ({
  name,
  placeholder = '',
  onChange = () => {},
  data,
  editable,
  sizeFont = 16
}) {
  const editor = useRef(null)
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault()
        const start = e.target.selectionStart
        const end = e.target.selectionEnd
        e.target.value = e.target.value.substring(0, start) + '\t' + e.target.value.substring(start)
        e.target.selectionStart = start + 1
        e.target.selectionEnd = end + 1
      }
      if (e.code.startsWith('Digit') && e.altKey) {
        e.preventDefault()
        const start = editor.current.selectionStart
        const end = editor.current.selectionEnd
        const value = editor.current.value
        if (e.shiftKey) {
          editor.current.value =
            value.substring(0, start) +
            '$' + e.code.at(-1) +
            value.substring(start)
          editor.current.selectionStart = start + 2
          editor.current.selectionEnd = end + 2
        } else {
          editor.current.value =
            value.substring(0, start) +
            '${' + e.code.at(-1) + ':' + value.substring(start, end) + '}' +
            value.substring(end)
          editor.current.selectionStart = start + 4
          editor.current.selectionEnd = end + 4
        }
      }
    }
    const change = (e) => {
      onChange(editor.current.value)
    }
    if (editable) {
      editor.current.addEventListener('keydown', handler)
      editor.current.addEventListener('keyup', change)
    }
    return () => {
      if (!editable) return
      editor.current.removeEventListener('keydown', handler)
      editor.current.removeEventListener('keyup', change)
    }
  }, [onChange])
  useEffect(() => {
    editor.current.value = data
  }, [data])
  return (
    <div className='code-editor-container'>
      {name && <label className='code-editor_label'>{name}</label>}
      <textarea
        ref={editor}
        className='code-editor'
        name={name}
        placeholder={placeholder}
        spellCheck='false'
        disabled={!editable}
        style={{ fontSize: `${sizeFont}px` }}
      >{}
      </textarea>
      {editable && (
        <div className='code-editor-suggestions'>
          <InformationCircleIcon className='code-editor-suggestions_icon' />
          <div className='code-editor-suggestions_lines'>
            <p className='code-editor-suggestions_line'>
              alt + number = ${'{number:cursor}'}
            </p>
            <p className='code-editor-suggestions_line'>
              alt + shift + number = $number
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
