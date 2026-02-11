import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="phone-frame bg-slate-900 overflow-hidden">
        <App />
      </div>
    </div>
  </React.StrictMode>,
)
