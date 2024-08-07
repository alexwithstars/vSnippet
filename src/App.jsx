import './App.css'

// libs
import { useEffect, useState } from 'react'
import { Bars3Icon, ClipboardDocumentIcon, BookmarkIcon } from '@heroicons/react/24/outline'

// custom hooks
import { useSnippet } from './hooks/useSnippet'
import { useToast } from './hooks/useToast'
import { useStorage } from './hooks/useStorage'

// components
import { PrimaryButton, SecondaryButton } from './components/Button'
import { ShortInput } from './components/ShortInput'
import { CodeEditor } from './components/CodeEditor'
import { ToastList } from './components/ToastList'
import { SideMenu } from './components/SideMenu'

// utilities
import { messages } from './scripts/messages'
import { settingsFields, defaultSettings } from './scripts/settings'

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
  const [settings, setSettings] = useState(() => {
    const setting = window.localStorage.getItem('settings')
    try {
      return setting ? JSON.parse(setting) : defaultSettings
    } catch (error) { return defaultSettings }
  })

  // hooks
  const { toasts, addToast, removeToast } = useToast()
  const { snippets, addSnippet, removeSnippet } = useStorage()
  const snippet = useSnippet({ ...fields, tabSize: settings.tabs ? 4 : 2 })

  // effects
  useEffect(() => {
    window.sessionStorage.setItem('sessionData', JSON.stringify(fields))
  }, [fields])
  useEffect(() => {
    window.localStorage.setItem('settings', JSON.stringify(settings))
  }, [settings])

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
        <section className='editors' style={{ tabSize: settings.tabs ? 4 : 2 }}>
          <CodeEditor
            editable
            name='code'
            placeholder='console.log("Hello World")'
            data={fields.code || ''}
            onChange={value => {
              setFields((prev) => ({ ...prev, code: value }))
            }}
            sizeFont={settings.fontSize}
          />
          {settings.preview &&
            <CodeEditor
              name='preview'
              data={snippet}
              sizeFont={settings.fontSize}
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
          settings={settingsFields.map(setting => (
            {
              ...setting,
              value: settings[setting.name] ?? defaultSettings[setting.name],
              onChange: (newValue) => {
                setSettings(prev => ({ ...prev, [setting.name]: newValue }))
              }
            }
          )
          )}
          snippets={snippets}
          onClose={() => setShowSideMenu(false)}
          onRemoveSnippet={(id) => {
            removeSnippet(id)
            addToast(messages.snippetDeleted)
          }}
          onSetSnippet={(fields) => {
            setFields(fields)
            addToast(messages.snippetSetAsActive)
          }}
          onFirstSnippet={() => {
            addSnippet(fields)
            addToast(messages.snippetSaved)
          }}
          onCopySnippet={(snippet) => copyToClipboard(snippet)}
        />}
      <ToastList removeToast={removeToast} toasts={toasts} />
    </>
  )
}
