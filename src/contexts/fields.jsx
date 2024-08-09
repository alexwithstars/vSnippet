import { createContext, useEffect, useState } from 'react'

export const FieldsContext = createContext()

const defaultFields = {
  id: 0,
  name: '',
  prefix: '',
  description: '',
  code: ''
}

export function FieldsProvider ({ children }) {
  const [fields, setFields] = useState(() => {
    const sessionData = window.sessionStorage.getItem('sessionData')
    try {
      return sessionData ? JSON.parse(sessionData) : defaultFields
    } catch (error) { return defaultFields }
  })

  useEffect(() => {
    window.sessionStorage.setItem('sessionData', JSON.stringify(fields))
  }, [fields])

  return (
    <FieldsContext.Provider value={{ fields, setFields }}>
      {children}
    </FieldsContext.Provider>
  )
}
