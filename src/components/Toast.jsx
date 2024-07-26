import './Toast.css'
import { useEffect } from 'react'
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export function Toast ({ id, title, message, type = 'info', duration, removeToast }) {
  const fadeOut = () => {
    const toast = document.getElementById(id)
    toast.style.setProperty('--height', toast.offsetHeight + 'px')
    toast.classList.add('toast_fadeOut')
    toast.addEventListener('animationend', () => {
      removeToast(id)
    })
  }
  const fadeIn = () => {
    const toast = document.getElementById(id)
    toast.style.setProperty('--duration', (duration - 50) + 'ms')
    toast.addEventListener('animationend', () => {
      toast.classList.remove('toast_fadeIn')
    })
  }
  useEffect(() => {
    fadeIn()
  }, [])
  useEffect(() => {
    const timer = setTimeout(() => {
      fadeOut()
    }, duration)
    return () => {
      clearTimeout(timer)
    }
  }, [duration])
  return (
    <div className={`toast toast_default toast_${type} toast_fadeIn`} id={id}>
      {
        type === 'error'
          ? <ExclamationCircleIcon className='toast-icon' />
          : type === 'warning'
            ? <ExclamationTriangleIcon className='toast-icon' />
            : type === 'success'
              ? <CheckCircleIcon className='toast-icon' />
              : <InformationCircleIcon className='toast-icon' />
      }
      <div className='toast-content'>
        <span className='toast-title'>{title}</span>
        <span className='toast-message'>{message}</span>
      </div>
      <XMarkIcon className='toast-close' strokeWidth={2.5} onClick={() => fadeOut()} />
      <div className='toast-progressbar' />
    </div>
  )
}
