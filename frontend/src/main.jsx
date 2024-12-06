import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AccountProvider from './context/AccountProvider'

const clientid = '253891965833-ucdoq9s5b0b4f012alhnmevu829urgbn.apps.googleusercontent.com';
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientid}>
    <AccountProvider>
      <App />
    </AccountProvider>
  </GoogleOAuthProvider>,
)
