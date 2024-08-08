export const TOAST_ACTION_TYPES = {
  ADD_TOAST: Symbol('ADD_TOAST'),
  REMOVE_TOAST: Symbol('REMOVE_TOAST')
}

export function toastReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case TOAST_ACTION_TYPES.ADD_TOAST: {
      const duration = payload.duration ?? 5000
      const newToast = {
        id: `toast_${crypto.randomUUID()}`,
        ...payload,
        duration
      }
      return [...state, newToast]
    }
    case TOAST_ACTION_TYPES.REMOVE_TOAST: {
      return state.filter((toast) => toast.id !== payload.id)
    }
    default:
      return state
  }
}
