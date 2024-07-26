import './Button.css'
import { NoSymbolIcon } from '@heroicons/react/24/outline'

function Button ({ text, Icon = NoSymbolIcon, onClick, className }) {
  return (
    <button
      className={`button ${className || ''}`}
      onClick={onClick}
    >
      <Icon className='button_icon' />
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
