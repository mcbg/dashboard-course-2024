import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

export function getConfigFromAPI(path) {
  return () => fetch(path, { mode: 'cors' })
      .then(x => x.json(), err => {
        console.log('API ERROR')
        console.log(err)
      })
}

export function render(elementId, getConfig) {
  ReactDOM.createRoot(document.getElementById(elementId)).render(
    <React.StrictMode>
      <App jsonfile='./bypass-data.json' />
    </React.StrictMode>
  )
}
