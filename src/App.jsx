import './App.css'

import { useEffect, useState } from 'react'
import { Bars3Icon, ClipboardDocumentIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import { useSnippet } from './hooks/useSnippet'
import { useToast } from './hooks/useToast'
import { useStorage } from './hooks/useStorage'
import { ShortInput } from './components/ShortInput'
import { CodeEditor } from './components/CodeEditor'
import { ToastList } from './components/ToastList'
import { PrimaryButton, SecondaryButton } from './components/Button'
import { messages } from './scripts/messages'
import { SideMenu } from './components/SideMenu'

export default function App () {
  const defaultFields = {
    id: 0,
    name: '',
    prefix: '',
    description: '',
    code: ''
  }
  const [fields, setFields] = useState(() => {
    const sessionData = window.sessionStorage.getItem('sessionData')
    try {
      return sessionData ? JSON.parse(sessionData) : defaultFields
    } catch (error) { return defaultFields }
  })
  const { toasts, addToast, removeToast } = useToast()
  const [settings, setSettings] = useState(() => {
    const setting = window.localStorage.getItem('settings')
    const defaultSettings = {
      preview: true,
      tabs: false,
      fontSize: 18
    }
    try {
      return setting ? JSON.parse(setting) : defaultSettings
    } catch (error) { return defaultSettings }
  })
  const { snippets, addSnippet, removeSnippet } = useStorage()
  const [showSideMenu, setShowSideMenu] = useState(false)
  const snippet = useSnippet({ ...fields, tabSize: settings.tabs ? 4 : 2 })
  const inputs = {
    name: 'My snippet',
    prefix: 'snippet',
    description: 'This is my snippet'
  }

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
          onClick={() => {
            window.navigator.clipboard.writeText(snippet)
              .then(() => addToast(messages.copiedToClipboard))
              .catch(() => addToast(messages.canNotCopyToClipboard))
          }}
        />
      </div>
      {showSideMenu &&
        <SideMenu
          onClose={() => setShowSideMenu(false)}
          onChangeSettings={setSettings}
          settings={settings}
          snippets={snippets}
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
          onCopySnippet={(snippet) => {
            window.navigator.clipboard.writeText(snippet)
              .then(() => addToast(messages.copiedToClipboard))
              .catch(() => addToast(messages.canNotCopyToClipboard))
          }}
        />}
      <ToastList removeToast={removeToast} toasts={toasts} />
    </>
  )
}
