import './App.css'

import { useEffect, useState } from 'react'
import { Bars3Icon, ClipboardDocumentIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import { useSnippet } from './hooks/useSnippet'
import { useToast } from './hooks/useToast'
import { ShortInput } from './components/ShortInput'
import { CodeEditor } from './components/CodeEditor'
import { ToastList } from './components/ToastList'
import { PrimaryButton, SecondaryButton } from './components/Button'
import { messages } from './scripts/messages'
import { SideMenu } from './components/SideMenu'

export default function App () {
  const [fields, setFields] = useState({})
  const { toasts, addToast, removeToast } = useToast()
  const snippet = useSnippet(fields)
  const inputs = {
    name: 'My snippet',
    prefix: 'snippet',
    description: 'This is my snippet'
  }

  useEffect(() => {
    const sessionData = window.sessionStorage.getItem('sessionData')
    if (sessionData) {
      setFields(JSON.parse(sessionData))
    }
  }, [])
  useEffect(() => {
    window.sessionStorage.setItem('sessionData', JSON.stringify(fields))
  }, [snippet])

  return (
    <>
      <header className='header'>
        <h1 className='header-title'>vSnippet</h1>
        <Bars3Icon className='header-icon' />
      </header>
      <main className='main-content'>
        <section className='short-inputs'>
          {Object.entries(inputs).map(([inputName, inputPlaceholder]) => (
            <ShortInput
              key={inputName}
              name={inputName}
              placeholder={inputPlaceholder}
              initialValue={fields[inputName] || ''}
              onChange={value => {
                setFields((prev) => ({ ...prev, [inputName]: value }))
              }}
            />
          ))}
        </section>
        <section className='editors'>
          <CodeEditor
            editable
            name='code'
            placeholder='console.log("Hello World")'
            initialValue={fields.code || ''}
            onChange={value => {
              setFields((prev) => ({ ...prev, code: value }))
            }}
          />
          <CodeEditor
            name='preview'
            value={snippet}
            onChange={() => { console.log('changed') }}
          />
        </section>
      </main>
      <div className='actions'>
        <SecondaryButton
          text='Save'
          Icon={BookmarkIcon}
          onClick={() => {
            addToast({
              title: 'Still in development',
              message: 'Sorry, this feature is still in development, stay tuned!',
              type: 'info'
            })
          }}
        />
        <PrimaryButton
          text='Copy'
          Icon={ClipboardDocumentIcon}
          onClick={() => {
            navigator.clipboard.writeText(snippet)
              .then(() => addToast(messages.copiedToClipboard))
              .catch(() => addToast(messages.canNotCopyToClipboard))
          }}
        />
      </div>
      <SideMenu />
      <ToastList removeToast={removeToast} toasts={toasts} />
    </>
  )
}
