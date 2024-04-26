import React, { useContext, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Navbar from './assets/Components/Navbar';
import { BrowserRouter, Navigate, Route, Router, Routes, useNavigate } from 'react-router-dom';
import { BookContext } from './Context/ContextProvider';
import Home from './Pages/Home';
import Favorites from './Pages/Favorites';
import UserInfo from './Pages/UserInfo';



function App() {
 
  const {state,dispatch}=useContext(BookContext)
  const navigate=useNavigate();
  

    const handleLoginSuccess = (credentialResponse) => {
        const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
        console.log(credentialResponseDecoded);
        dispatch({type:"LOGIN",payload: credentialResponseDecoded});
        navigate('/home')
      };
    
      const handleLogoutSuccess = () => {
        console.log('Logout Successful');
        dispatch({type:"LOGOUT"})
      };

  

  return (
    <>
    <div className='login'>
        {!state?.loggedIn ? (
          <div style={{width:'100vw', display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center', height:'100vh', background:'#87CEEB'}}>
          <h4>Login with Google</h4>
          <GoogleLogin
            clientId="611782178636-cmdloepmjps2udipsttcjbau2hcbu2p8.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
            onLogoutSuccess={handleLogoutSuccess}
          />
         
          </div>
        ) : (
          <Routes>
            <Route path="/home" element={<Home handleLogoutSuccess={handleLogoutSuccess} />} />
            <Route path="/fav" element={<Favorites />} />  
            <Route  path="/:userId" element={<UserInfo/>}/>    
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        )}
      </div>
    </>
    
  )
}

export default App