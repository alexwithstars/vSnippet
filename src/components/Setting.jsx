import './Setting.css'
import { useEffect, useState } from 'react'

function Setting ({ name, defaultValue, description, onChange = () => {}, type }) {
  const [value, setValue] = useState(defaultValue)
  useEffect(() => {
    onChange(value)
  }, [value])
  return (
    <label className='setting'>
      <div className='setting_label'>
        <span className='setting_name'>{name}</span>
        <span className='setting_description'>{description}</span>
      </div>
      {type === 'toggle' && (
        <div
          className={`toggle-setting_container ${value ? 'active' : ''}`}
          onClick={() => setValue(prev => !prev)}
        >
          <div className='toggle-setting_indicator' />
        </div>
      )}
      {type === 'number' && (
        <div className='number-setting_container'>
          <input
            type='number'
            className='number-setting_input'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <span className='number-setting_unit'>px</span>
        </div>
      )}
    </label>
  )
}

export function ToggleSetting ({ name, defaultValue, description, onChange }) {
  return (
    <Setting
      name={name}
      description={description}
      defaultValue={defaultValue}
      onChange={onChange}
      type='toggle'
    />
  )
}

export function NumberSetting ({ name, defaultValue, description, onChange }) {
  return (
    <Setting
      name={name}
      description={description}
      defaultValue={defaultValue}
      onChange={onChange}
      type='number'
    />
  )
}
