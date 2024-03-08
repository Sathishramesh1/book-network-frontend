import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BookProvider } from './Context/ContextProvider.jsx';
import { BrowserRouter } from 'react-router-dom'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BookProvider>
   <BrowserRouter>
 <GoogleOAuthProvider clientId='611782178636-cmdloepmjps2udipsttcjbau2hcbu2p8.apps.googleusercontent.com'>
 
    <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
    </BookProvider>
  </React.StrictMode>,
)
