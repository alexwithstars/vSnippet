import { createContext, useState, useEffect } from 'react'

export const SnippetStorageContext = createContext()

export function SnippetStorageProvider ({ children }) {
  const [snippets, setSnippets] = useState(() => {
    const snippets = window.localStorage.getItem('snippets')
    try {
      return snippets ? JSON.parse(snippets) : []
    } catch (error) { return [] }
  })

  useEffect(() => {
    window.localStorage.setItem('snippets', JSON.stringify(snippets))
  }, [snippets])

  return (
    <SnippetStorageContext.Provider value={{ snippets, setSnippets }}>
      {children}
    </SnippetStorageContext.Provider>
  )
}
