import { useContext } from 'react'
import { FieldsContext } from '../contexts/fields'

export function useFields () {
  const context = useContext(FieldsContext)

  if (context === undefined) {
    throw new Error('useFields must be used within a FieldsProvider')
  }

  return context
}
