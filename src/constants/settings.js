export const SETTINGS = {
  PREVIEW: 'preview',
  TABS: 'tabs',
  FONT_SIZE: 'fontSize',
  INITIAL_TAB: 'initialTab'
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
  },
  {
    id: SETTINGS.INITIAL_TAB,
    title: 'initial tab',
    description: 'Set an initial tab at the end of every line except for the first one to paste easily',
    type: 'toggle'
  }
]

export const defaultSettings = {
  [SETTINGS.PREVIEW]: true,
  [SETTINGS.TABS]: false,
  [SETTINGS.FONT_SIZE]: 18,
  [SETTINGS.INITIAL_TAB]: false
}
