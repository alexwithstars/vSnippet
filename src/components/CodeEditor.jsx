import './CodeEditor.css'
import { useEffect } from 'react'

export function CodeEditor ({
  name,
  placeholder = '',
  onChange = () => {},
  value,
  editable,
  initialValue
}) {
  useEffect(() => {
    if (editable) onChange('')
  }, [])
  return (
    <div className='code-editor-container'>
      <label className='code-editor_label'>{name}</label>
      <textarea
        className='code-editor'
        name={name}
        placeholder={placeholder}
        spellCheck='false'
        disabled={!editable}
        value={value}
        defaultValue={initialValue}
        style={!editable ? { color: 'var(--gray300)' } : {}}
        onKeyDown={e => {
          if (e.key === 'Tab') {
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
