import './index.css'
import ReactDOM from 'react-dom/client'
import App from './src/App'
import { ToastProvider } from './src/contexts/toast'
import { SettingsProvider } from './src/contexts/settings'
import { SnippetStorageProvider } from './src/contexts/snippetStorage'
import { FieldsProvider } from './src/contexts/fields'

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('/sw.js')
}

const root = ReactDOM.createRoot(document.getElementById('app'))

// this is ordered by how much they update normally
// the first one is the one that don't update frequently
// and the last one is the one that update frequently
// idk if this is better for performance, but it makes sense to me
root.render(
  <SnippetStorageProvider>
    <SettingsProvider>
      <ToastProvider>
        <FieldsProvider>
          <App />
        </FieldsProvider>
      </ToastProvider>
    </SettingsProvider>
  </SnippetStorageProvider>
)
