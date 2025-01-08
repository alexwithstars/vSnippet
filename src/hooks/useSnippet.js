import { useState, useEffect } from 'react'

const specialCharacters = /["\\]/g
const toSnippet = /^.*$/gm

export function useSnippet ({
  name = '',
  prefix = '',
  description = '',
  code = '',
  tabSize = 2,
  initialTab = false
}) {
  const [snippet, setSnippet] = useState('')
  const tabs = new RegExp(`\t| {${tabSize}}`, 'g')
  const initialTabChar = initialTab ? '\t' : ''
  const getSnippet = () => {
    const formatedCode = (code || '')
      .replace(specialCharacters, match => `\\${match}`)
      .replace(tabs, '\\t')
      .replace(toSnippet, match => `${initialTabChar}\t\t"${match}",`)
      .slice(0, -1)
    const resultSnippet =
    `"${name}": {\
    \n\t${initialTabChar}"prefix": "${prefix}",\
    \n\t${initialTabChar}"body": [\n${formatedCode}\
    \n\t${initialTabChar}],\
    \n\t${initialTabChar}"description": "${description}"\
    \n${initialTabChar}}`
    return resultSnippet
  }
  useEffect(() => {
    setSnippet(getSnippet())
  }, [name, prefix, description, code, tabSize, initialTab])
  return snippet
}
