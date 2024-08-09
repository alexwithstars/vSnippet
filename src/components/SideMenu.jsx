import './SideMenu.css'
import { XMarkIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { ToggleSetting, NumberSetting } from './Setting'
import { useRef, useEffect } from 'react'
import { PreviewSnippet } from './PreviewSnippet'
import { PrimaryButton } from './Button'
import { useSettings } from '../hooks/useSettings'
import { settingsFields } from '../constants/settings'
import { useSnippetStorage } from '../hooks/useSnippetStorage'
import { useFields } from '../hooks/useFields'

export function SideMenu ({ onClose = () => {} }) {
  const sideMenu = useRef(null)

  const show = () => {
    sideMenu.current.addEventListener('animationend', () => {
      sideMenu.current.classList.remove('side-menu_fadeIn')
    })
  }
  const hide = () => {
    sideMenu.current.classList.add('side-menu_fadeOut')
    sideMenu.current.addEventListener('animationend', () => {
      onClose()
    })
  }

  const { settings, setSetting } = useSettings()
  const { snippets, addSnippet } = useSnippetStorage()
  const { fields } = useFields()

  useEffect(() => show(), [])

  return (
    <section
      className='side-menu-container side-menu_fadeIn' ref={sideMenu}
      onClick={() => hide()}
    >
      <aside className='side-menu' onClick={(e) => e.stopPropagation()}>
        <section className='side-menu_top'>
          <XMarkIcon className='side-menu_close' onClick={() => hide()} />
        </section>
        <section className='side-menu_content'>
          <h3>Settings</h3>
          <div className='side-menu_settings'>
            {settingsFields.map(setting => {
              const props = {
                title: setting.title,
                description: setting.description,
                value: settings[setting.id],
                onChange: (value) => setSetting(setting.id, value)
              }
              if (setting.type === 'toggle') {
                return <ToggleSetting key={setting.id} {...props} />
              }
              if (setting.type === 'number') {
                return <NumberSetting key={setting.id} {...props} />
              }
              return null
            })}
          </div>
          <h3>Snippets</h3>
          <div className='side-menu_snippets'>
            {snippets.map(snippet => (
              <PreviewSnippet
                key={snippet.id}
                fields={snippet}
              />
            ))}
            {snippets.length === 0 && (
              <div className='side-menu_noSnippets'>
                <p className='side-menu_noSnippets_text'>There's no snippets yet</p>
                <PrimaryButton
                  text='Add the current snippet!'
                  onClick={() => addSnippet(fields)}
                  Icon={PlusCircleIcon}
                />
              </div>
            )}
          </div>
        </section>
      </aside>
    </section>
  )
}
