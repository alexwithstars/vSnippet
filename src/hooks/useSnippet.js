import { useState, useEffect } from 'react'

const specialCharacters = /["\\]/g
const toSnippet = /^.*$/gm

export function useSnippet ({
  name = '',
  prefix = '',
  description = '',
  code = '',
  tabSize = 2
}) {
  const [snippet, setSnippet] = useState('')
  const tabs = new RegExp(`\t| {${tabSize}}`, 'g')
  const getSnippet = () => {
    const formatedCode = (code || '')
      .replace(specialCharacters, match => `\\${match}`)
      .replace(tabs, '\\t')
      .replace(toSnippet, match => `\t\t"${match}",`)
      .slice(0, -1)
    const resultSnippet =
    `"${name}": {\n\t"prefix": "${prefix}",\n\t"body": [\n${formatedCode}\n\t],\n\t"description": "${description}"\n}`
    return resultSnippet
  }
  useEffect(() => {
    setSnippet(getSnippet())
  }, [name, prefix, description, code, tabSize])
  return snippet
}
