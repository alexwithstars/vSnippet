export const SETTINGS = {
  PREVIEW: 'preview',
  TABS: 'tabs',
  FONT_SIZE: 'fontSize'
}

export const settingsFields = [
  {
    id: SETTINGS.PREVIEW,
    title: 'preview',
    description: 'Show snippet preview',
    type: 'toggle'
  },
  {
    id: SETTINGS.TABS,
    title: 'four spaces',
    description: 'Use 4 spaces for tabs instead of 2',
    type: 'toggle'
  },
  {
    id: SETTINGS.FONT_SIZE,
    title: 'font size',
    description: 'Set the code font size',
    type: 'number'
  }
]

export const defaultSettings = {
  [SETTINGS.PREVIEW]: true,
  [SETTINGS.TABS]: false,
  [SETTINGS.FONT_SIZE]: 18
}
