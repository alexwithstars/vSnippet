import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './src/App'

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('/sw.js')
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<App />)
