import { useEffect } from 'react'
import './ShortInput.css'

export function ShortInput ({ name, placeholder, initialValue = '', onChange }) {
  useEffect(() => {
    onChange('')
  }, [])
  return (
    <label className='short-input'>
      <span className='short-input_name'>{name}</span>
      <input
        className='short-input_input'
        type='text'
        defaultValue={initialValue}
        placeholder={placeholder || name}
        onChange={e => {
          onChange(e.target.value)
        }}
      />
    </label>
  )
}
