import { useContext } from 'react'
import { SettingsContext } from '../contexts/settings'

export function useSettings () {
  const context = useContext(SettingsContext)

  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }

  const { settings, setSettings } = context
  const setSetting = (id, value) => {
    if (!(id in settings)) return
    setSettings({ ...settings, [id]: value })
  }

  return { settings, setSetting }
}
