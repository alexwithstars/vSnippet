import './index.css'
import ReactDOM from 'react-dom/client'
import App from './src/App'
import { ToastProvider } from './src/contexts/toast'
import { SettingsProvider } from './src/contexts/settings'

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('/sw.js')
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(
  <ToastProvider>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </ToastProvider>
)
