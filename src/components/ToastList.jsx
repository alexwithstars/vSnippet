import './ToastList.css'
import { Toast } from './Toast'

export function ToastList ({ toasts }) {
  return (
    <section className='toast-list'>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
        />
      ))}
    </section>
  )
}
