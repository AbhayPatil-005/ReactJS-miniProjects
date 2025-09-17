import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NoteContextProvider from './components/dataContext/NoteContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NoteContextProvider>
    <App />
    </NoteContextProvider>
  </StrictMode>,
)
