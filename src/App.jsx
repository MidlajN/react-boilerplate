import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import AppRoutes from './routes/Router'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GoogleOAuthProvider clientId="GOOGLE_CLIENT_ID">
        <AppRoutes />
      </GoogleOAuthProvider>
    </>
  )
}

export default App
