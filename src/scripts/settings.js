export const settingsFields = [
  {
    name: 'preview',
    title: 'preview',
    description: 'Show snippet preview',
    type: 'toggle'
  },
  {
    name: 'tabs',
    title: 'four spaces',
    description: 'Use 4 spaces for tabs instead of 2',
    type: 'toggle'
  },
  {
    name: 'fontSize',
    title: 'font fize',
    description: 'Set the code font size',
    type: 'number'
  }
]

export const defaultSettings = {
  preview: true,
  tabs: false,
  fontSize: 18
}
