import './Setting.css'

function Setting ({ title, value, description, onChange = () => {}, type }) {
  return (
    <label className='setting'>
      <div className='setting_label'>
        <span className='setting_name'>{title}</span>
        <span className='setting_description'>{description}</span>
      </div>
      {type === 'toggle' && (
        <div
          className={`toggle-setting_container ${value ? 'active' : ''}`}
          onClick={() => onChange(!value)}
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
            onChange={(e) => onChange(e.target.value)}
          />
          <span className='number-setting_unit'>px</span>
        </div>
      )}
    </label>
  )
}

export function ToggleSetting ({ title, value, description, onChange }) {
  return (
    <Setting
      title={title}
      description={description}
      value={value}
      onChange={onChange}
      type='toggle'
    />
  )
}

export function NumberSetting ({ title, value, description, onChange }) {
  const tryParse = (value) => {
    const num = Number(value)
    if (Number.isNaN(num)) {
      return 0
    }
    return num
  }
  return (
    <Setting
      title={title}
      description={description}
      value={value}
      onChange={newValue => onChange(tryParse(newValue))}
      type='number'
    />
  )
}
