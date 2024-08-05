import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Colors from './src/Colors'

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('/sw.js')
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<Colors />)
