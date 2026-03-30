import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import './index.css'
import App from './App.tsx'

// Force full reload on F5 / back-forward cache to prevent stale GSAP state
window.addEventListener('pageshow', (e) => {
  if (e.persisted) window.location.reload()
})

// Clear any scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
