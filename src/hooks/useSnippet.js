import { useState, useEffect } from 'react'

export function useSnippet ({
  name = '',
  prefix = '',
  description = '',
  code = '',
  tabSize = 2
}) {
  const [snippet, setSnippet] = useState('')
  const specialCharacters = /["'\\]/g
  const htmlg = />/g
  const htmll = /</g
  const toSnippet = /^.*$/gm
  const tabs = new RegExp(`\t| {${tabSize}}`, 'g')
  const getSnippet = () => {
    const formatedCode = (code || '')
      .replace(specialCharacters, match => `\\${match}`)
      .replace(htmlg, '&gt;')
      .replace(htmll, '&lt;')
      .replace(tabs, '\\t')
      .replace(toSnippet, match => `\t\t"${match}",`)
      .slice(0, -1)
    const resultSnippet =
    `"${name}": {\n\t"prefix": "${prefix}",\n\t"body": [\n${formatedCode}\n\t],\n\t"description": "${description}"\n}`
    return resultSnippet
  }
  useEffect(() => {
    setSnippet(getSnippet())
  }, [name, prefix, description, code])
  return snippet
}
