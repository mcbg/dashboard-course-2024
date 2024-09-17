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
      <App jsonfile='./bypass-data.json' idvar="id" x="log2 fold change" y="negative log10 p-value" drillvars={['EntrezGeneSymbol', 'TargetFullName']}/>
    </React.StrictMode>
  )
}
