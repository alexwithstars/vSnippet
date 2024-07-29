import './Button.css'

function Button ({ text, Icon, onClick, className }) {
  return (
    <button
      className={`button ${className || ''}`}
      onClick={onClick}
    >
      {Icon && <Icon className='button_icon' />}
      <span className='button_text'>{text}</span>
    </button>
  )
}

export function PrimaryButton ({ text, Icon, onClick }) {
  return (
    <Button
      text={text}
      Icon={Icon}
      onClick={onClick}
      className='primary-button'
    />
  )
}

export function SecondaryButton ({ text, Icon, onClick }) {
  return (
    <Button
      text={text}
      Icon={Icon}
      onClick={onClick}
      className='secondary-button'
    />
  )
}
