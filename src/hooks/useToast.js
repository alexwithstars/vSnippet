import { useState } from 'react'

export function useToast () {
  const [toasts, setToasts] = useState([])
  const addToast = ({ title = '', message = '', type = 'info', duration = 5000 }) => {
    const newToast = {
      id: `toast_${crypto.randomUUID()}`,
      title,
      message,
      type,
      duration
    }
    setToasts((prev) => [...prev, newToast])
  }
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }
  return { toasts, addToast, removeToast }
}
