import './SideMenu.css'
import { XMarkIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { ToggleSetting, NumberSetting } from './Setting'
import { useRef, useEffect } from 'react'
import { PreviewSnippet } from './PreviewSnippet'
import { PrimaryButton } from './Button'

export function SideMenu ({
  settings,
  snippets,
  onClose = () => {},
  onChangeSettings = () => {},
  onRemoveSnippet = () => {},
  onSetSnippet = () => {},
  onCopySnippet = () => {},
  onFirstSnippet = () => {}
}) {
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
            <ToggleSetting
              name='Preview'
              description='Show or hide the snippet preview'
              defaultValue={settings.preview}
              onChange={value => onChangeSettings(prev => ({ ...prev, preview: value }))}
            />
            <ToggleSetting
              name='4 spaces tab size'
              description='Set the tab size to 4 spaces instead of 2'
              defaultValue={settings.tabs}
              onChange={value => onChangeSettings(prev => ({ ...prev, tabs: value }))}
            />
            <NumberSetting
              name='Font size'
              description='Set the code font size'
              defaultValue={settings.fontSize}
              onChange={value => onChangeSettings(prev => ({ ...prev, fontSize: value }))}
            />
          </div>
          <h3>Snippets</h3>
          <div className='side-menu_snippets'>
            {snippets.map(snippet => (
              <PreviewSnippet
                key={snippet.id}
                fields={snippet}
                onDelete={fields => onRemoveSnippet(fields.id)}
                onSelect={onSetSnippet}
                onCopy={onCopySnippet}
              />
            ))}
            {snippets.length === 0 && (
              <div className='side-menu_noSnippets'>
                <p className='side-menu_noSnippets_text'>There's no snippets yet</p>
                <PrimaryButton
                  text='Add the current snippet!'
                  onClick={onFirstSnippet}
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
