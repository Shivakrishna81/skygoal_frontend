import React, { useState ,useEffect} from 'react'
import { Link,useNavigate} from 'react-router-dom'
import axios from "axios"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import './components.css'

const SignUp = () => {

   const navigate=useNavigate()

   const [userDetails,setUserDetails]=useState({username: "", password: "", email: "", confirmpassword: ""})
   const {password,confirmpassword,email,username}=userDetails

   const onChangeInput=(e)=>{
    setUserDetails({...userDetails,[e.target.name]:e.target.value})
   }

   const toastOptions={
    position:"top-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
  }

  useEffect(()=>{
    const details=localStorage.getItem("registeredUser")
    if (details){
        navigate("/")
    }
  },[])
   

  const handaleSubmitEvent= async (e)=>{
      e.preventDefault()
      if (password!==confirmpassword){
        toast.error("Password and Confirm Password Should be Same",toastOptions)
        return false
      }
      else if (username===""){
        toast.error("Username is Required",toastOptions)
        return false
      }
      else if (email===""){
        toast.error("Email is Required",toastOptions)
        return false
      }
      else if (password===""){
        toast.error("Password is Required",toastOptions)
        return false
      }
      const {data}=await axios.post("http://localhost:5000/auth/signup",{username,password,email})
      if(data.status===true){
        toast.success("Created user Successfully!",toastOptions)
        localStorage.setItem("registeredUser",JSON.stringify(data.user))
        navigate("/")
      }
  }

    return(<div className='mainContainer'>
    <form onSubmit={(e) => handaleSubmitEvent(e)}>
    <h1 className='pageHead'>Sign Up!</h1>
      <div className='inputContainer'>
        <label className='labelHead'>Username</label>
        <input placeholder='Username' value={username} name="username" type='text' className='input' onChange={(e) => onChangeInput(e)} />
      </div>

      <div className='inputContainer'>
        <label className='labelHead'>Email</label>
        <input placeholder='Email' value={email} name="email" type='email' className='input' onChange={(e) => onChangeInput(e)} />
      </div>

      <div className='inputContainer'>
        <label className='labelHead'>Password</label>
        <input placeholder='Password' value={password} name="password" type='text' className='input' onChange={(e) => onChangeInput(e)} />
      </div>

      <div className='inputContainer'>
        <label className='labelHead'>Confirm Password</label>
        <input placeholder='Confirm Password' value={confirmpassword} name="confirmpassword" type='text' className='input' onChange={(e) => onChangeInput(e)} />
      </div>


      <button type='submit' className='button'>Create User</button>
      <p className='existPara'>Already a user? <span><Link to="/login" className='span'>Login</Link></span></p>

    </form>
    <ToastContainer/>
  </div>
)
}

export default SignUp