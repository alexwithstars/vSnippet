import { useContext } from 'react'
import { SettingsContext } from '../contexts/settings'
import { defaultSettings } from '../constants/settings'

export function useSettings () {
  const context = useContext(SettingsContext)

  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }

  const { settings, setSettings } = context
  const setSetting = (id, value) => {
    if (!(id in defaultSettings)) return
    setSettings({ ...settings, [id]: value })
  }

  return { settings, setSetting }
}
