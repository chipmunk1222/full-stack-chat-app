import React, { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore.js'
import {Routes,Route, Navigate} from 'react-router-dom'


import NavBar from './components/NavBar'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import SettingPage from './pages/SettingPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

import { Loader } from 'lucide-react'

import { Toaster } from 'react-hot-toast'

const App = () => {

  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // console.log(authUser,isCheckingAuth);

  if(isCheckingAuth && !authUser) 
  // if(true)
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className="size-10 animate-spin" />
      </div>
    )

  return (
    <div>
      <NavBar />
      
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path="/signup" element={!authUser ?  <SignUpPage /> : <Navigate to='/' />} />
        <Route path="/login" element={!authUser ?  <LoginPage /> : <Navigate to='/' />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/profile" element={authUser ?<ProfilePage /> : <Navigate to='/login' />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App