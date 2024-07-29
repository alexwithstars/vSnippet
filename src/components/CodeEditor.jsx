import './CodeEditor.css'
import { useEffect, useRef } from 'react'

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
    if (editable) onChange('')
  }, [])
  useEffect(() => {
    editor.current.value = data
  }, [data])
  return (
    <div className='code-editor-container'>
      {name && <label className='code-editor_label'>{name}</label>}
      <textarea
        ref={editor}
        className='code-editor '
        name={name}
        placeholder={placeholder}
        spellCheck='false'
        disabled={!editable}
        style={{ fontSize: `${sizeFont}px` }}
        onKeyDown={e => {
          if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault()
            const start = e.target.selectionStart
            const end = e.target.selectionEnd
            e.target.value = e.target.value.substring(0, start) + '\t' + e.target.value.substring(start)
            e.target.selectionStart = start + 1
            e.target.selectionEnd = end + 1
            onChange(e.target.value)
          }
        }}
        onChange={e => {
          if (editable) onChange(e.target.value)
        }}
      >{}
      </textarea>
    </div>
  )
}
