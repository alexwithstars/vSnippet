import { useEffect, useState } from 'react'

export function useStorage () {
  const [snippets, setSnippets] = useState(() => {
    const snippets = window.localStorage.getItem('snippets')
    try {
      return snippets ? JSON.parse(snippets) : []
    } catch (error) { return [] }
  })
  useEffect(() => {
    window.localStorage.setItem('snippets', JSON.stringify(snippets))
  }, [snippets])

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
