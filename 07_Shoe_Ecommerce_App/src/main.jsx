import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './data/CartContext.jsx'
import { StoreProvider } from './data/StoreContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <StoreProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </StoreProvider>

  </StrictMode>,
)
