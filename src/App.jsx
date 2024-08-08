import './App.css'

// libs
import { useEffect, useState } from 'react'
import { Bars3Icon, ClipboardDocumentIcon, BookmarkIcon } from '@heroicons/react/24/outline'

// custom hooks
import { useSnippet } from './hooks/useSnippet'
import { useToast } from './hooks/useToast'
import { useSnippetStorage } from './hooks/useSnippetStorage'
import { useSettings } from './hooks/useSettings'

// components
import { PrimaryButton, SecondaryButton } from './components/Button'
import { ShortInput } from './components/ShortInput'
import { CodeEditor } from './components/CodeEditor'
import { ToastList } from './components/ToastList'
import { SideMenu } from './components/SideMenu'

// utilities
import { messages } from './constants/messages'
import { SETTINGS } from './constants/settings'

export default function App () {
  const inputs = {
    name: 'My snippet',
    prefix: 'snippet',
    description: 'This is my snippet'
  }
  const defaultFields = {
    id: 0,
    name: '',
    prefix: '',
    description: '',
    code: ''
  }

  // functions
  const copyToClipboard = (text) => {
    window.navigator.clipboard.writeText(text)
      .then(() => addToast(messages.copiedToClipboard))
      .catch(() => addToast(messages.canNotCopyToClipboard))
  }

  // states
  const [showSideMenu, setShowSideMenu] = useState(false)
  const [fields, setFields] = useState(() => {
    const sessionData = window.sessionStorage.getItem('sessionData')
    try {
      return sessionData ? JSON.parse(sessionData) : defaultFields
    } catch (error) { return defaultFields }
  })

  // hooks
  const { toasts, addToast } = useToast()
  const { addSnippet } = useSnippetStorage()
  const { settings } = useSettings()
  const snippet = useSnippet({ ...fields, tabSize: settings[SETTINGS.TABS] ? 4 : 2 })

  // effects
  useEffect(() => {
    window.sessionStorage.setItem('sessionData', JSON.stringify(fields))
  }, [fields])

  return (
    <>
      <header className='header'>
        <h1 className='header-title'>vSnippet</h1>
        <Bars3Icon
          className='header-icon'
          onClick={() => setShowSideMenu(true)}
        />
      </header>
      <main className='main-content'>
        <section className='short-inputs'>
          {Object.entries(inputs).map(([inputName, inputPlaceholder]) => (
            <ShortInput
              key={inputName}
              name={inputName}
              placeholder={inputPlaceholder}
              data={fields[inputName] || ''}
              onChange={value => {
                setFields((prev) => ({ ...prev, [inputName]: value }))
              }}
            />
          ))}
        </section>
        <section className='editors' style={{ tabSize: settings[SETTINGS.TABS] ? 4 : 2 }}>
          <CodeEditor
            editable
            name='code'
            placeholder='console.log("Hello World")'
            data={fields.code || ''}
            onChange={value => {
              setFields((prev) => ({ ...prev, code: value }))
            }}
            sizeFont={settings[SETTINGS.FONT_SIZE]}
          />
          {settings.preview &&
            <CodeEditor
              name='preview'
              data={snippet}
              sizeFont={settings[SETTINGS.FONT_SIZE]}
            />}
        </section>
      </main>
      <div className='actions'>
        <SecondaryButton
          text='Save'
          Icon={BookmarkIcon}
          onClick={() => {
            addSnippet(fields)
            addToast(messages.snippetSaved)
          }}
        />
        <PrimaryButton
          text='Copy'
          Icon={ClipboardDocumentIcon}
          onClick={() => copyToClipboard(snippet)}
        />
      </div>
      {showSideMenu &&
        <SideMenu
          onClose={() => setShowSideMenu(false)}
          onSetSnippet={(fields) => {
            setFields(fields)
            addToast(messages.snippetSetAsActive)
          }}
          onFirstSnippet={() => {
            addSnippet(fields)
            addToast(messages.snippetSaved)
          }}
        />}
      <ToastList toasts={toasts} />
    </>
  )
}
