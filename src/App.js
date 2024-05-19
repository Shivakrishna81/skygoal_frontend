import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignUp  from './components/SignUp'
import Login from './components/Login'
import User from './components/User'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<User/>} />
          <Route path='/signup' element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App