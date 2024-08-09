import './App.css'

// libs
import { useState } from 'react'
import { Bars3Icon, ClipboardDocumentIcon, BookmarkIcon } from '@heroicons/react/24/outline'

// custom hooks
import { useSnippet } from './hooks/useSnippet'
import { useToast } from './hooks/useToast'
import { useSnippetStorage } from './hooks/useSnippetStorage'
import { useSettings } from './hooks/useSettings'
import { useFields } from './hooks/useFields'

// components
import { PrimaryButton, SecondaryButton } from './components/Button'
import { ShortInput } from './components/ShortInput'
import { CodeEditor } from './components/CodeEditor'
import { ToastList } from './components/ToastList'
import { SideMenu } from './components/SideMenu'

// utilities
import { messages } from './constants/messages'
import { SETTINGS } from './constants/settings'

// constants
const inputs = [
  { label: 'name', placeholder: 'My snippet' },
  { label: 'prefix', placeholder: 'snippet' },
  { label: 'description', placeholder: 'This is my snippet' }
]

export default function App () {
  // functions
  const copyToClipboard = (text) => {
    window.navigator.clipboard.writeText(text)
      .then(() => addToast(messages.copiedToClipboard))
      .catch(() => addToast(messages.canNotCopyToClipboard))
  }

  // states
  const [showSideMenu, setShowSideMenu] = useState(false)

  // hooks
  const { toasts, addToast } = useToast()
  const { addSnippet } = useSnippetStorage()
  const { settings } = useSettings()
  const { fields, setFields } = useFields()
  const snippet = useSnippet({ ...fields, tabSize: settings[SETTINGS.TABS] ? 4 : 2 })

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
          {inputs.map(({ label, placeholder }) => (
            <ShortInput
              key={label}
              name={label}
              placeholder={placeholder}
              data={fields[label] || ''}
              onChange={value => {
                setFields((prev) => ({ ...prev, [label]: value }))
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
        />}
      <ToastList toasts={toasts} />
    </>
  )
}
