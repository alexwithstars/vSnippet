import { createContext, useReducer } from 'react'
import { toastReducer, TOAST_ACTION_TYPES } from '../reducers/toast'

export const ToastContext = createContext()

function useToastReducer () {
  const [state, dispatch] = useReducer(toastReducer, [])

  const addToast = (toast) => {
    dispatch({ type: TOAST_ACTION_TYPES.ADD_TOAST, payload: toast })
  }

  const removeToast = (id) => {
    dispatch({ type: TOAST_ACTION_TYPES.REMOVE_TOAST, payload: { id } })
  }

  return { toasts: state, addToast, removeToast }
}

export function ToastProvider ({ children }) {
  const { toasts, addToast, removeToast } = useToastReducer()
  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}
