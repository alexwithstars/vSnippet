import { useContext } from 'react'
import { SnippetStorageContext } from '../contexts/snippetStorage'

export function useSnippetStorage () {
  const context = useContext(SnippetStorageContext)

  if (context === undefined) {
    throw new Error('useStorage must be used within a SnippetStorageProvider')
  }

  const { snippets, setSnippets } = context
  const addSnippet = (snippetFields) => {
    const newSnippet = {
      ...snippetFields,
      id: `snippet_${crypto.randomUUID()}`
    }
    setSnippets((prev) => [...prev, newSnippet])
  }
  const removeSnippet = (id) => {
    setSnippets((prev) => prev.filter((snippet) => snippet.id !== id))
  }

  return { snippets, addSnippet, removeSnippet }
}
