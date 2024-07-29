import './Toast.css'
import { useEffect, useRef } from 'react'
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export function Toast ({ id, title, message, type = 'info', duration, removeToast }) {
  const toast = useRef(null)
  const timer = useRef(null)
  const started = useRef(performance.now())
  const remaining = useRef(duration)
  const fadeOut = () => {
    toast.current.style.setProperty('--height', toast.current.offsetHeight + 'px')
    toast.current.classList.add('toast_fadeOut')
    toast.current.addEventListener('animationend', () => {
      removeToast(id)
    })
  }
  const fadeIn = () => {
    toast.current.style.setProperty('--duration', (duration - 50) + 'ms')
    toast.current.addEventListener('animationend', () => {
      toast.current.classList.remove('toast_fadeIn')
    })
  }

  useEffect(() => fadeIn(), [])
  useEffect(() => {
    timer.current = setTimeout(() => fadeOut(), duration)
    return () => clearTimeout(timer.current)
  }, [duration])

  const toastMap = {
    error: () => <ExclamationCircleIcon className='toast-icon' />,
    warning: () => <ExclamationTriangleIcon className='toast-icon' />,
    success: () => <CheckCircleIcon className='toast-icon' />
  }

  return (
    <div
      className={`toast toast_default toast_${type} toast_fadeIn`}
      ref={toast}
      onMouseEnter={() => {
        clearTimeout(timer.current)
        remaining.current -= (performance.now() - started.current)
      }}
      onMouseLeave={() => {
        started.current = performance.now()
        timer.current = setTimeout(() => fadeOut(), remaining.current)
      }}
    >
      {type in toastMap ? toastMap[type]() : <InformationCircleIcon className='toast-icon' />}
      <div className='toast-content'>
        <span className='toast-title'>{title}</span>
        <span className='toast-message'>{message}</span>
      </div>
      <XMarkIcon className='toast-close' strokeWidth={2.5} onClick={() => fadeOut()} />
      <div className='toast-progressbar' />
    </div>
  )
}
