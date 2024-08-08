import { createContext, useEffect, useState } from 'react'
import { defaultSettings } from '../constants/settings'

export const SettingsContext = createContext()

export function SettingsProvider ({ children }) {
  const [settings, setSettings] = useState(() => {
    const setting = window.localStorage.getItem('settings')
    try {
      return setting ? JSON.parse(setting) : defaultSettings
    } catch (error) { return defaultSettings }
  })

  useEffect(() => {
    window.localStorage.setItem('settings', JSON.stringify(settings))
  }, [settings])

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}
