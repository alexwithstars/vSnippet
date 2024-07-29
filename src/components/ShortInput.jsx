import { useEffect, useRef } from 'react'
import './ShortInput.css'

export function ShortInput ({ name, placeholder, data = '', onChange }) {
  const input = useRef(null)
  useEffect(() => {
    input.current.value = data
  }, [data])
  return (
    <label className='short-input'>
      <span className='short-input_name'>{name}</span>
      <input
        ref={input}
        className='short-input_input'
        type='text'
        placeholder={placeholder || name}
        onChange={e => {
          onChange(e.target.value)
        }}
      />
    </label>
  )
}
