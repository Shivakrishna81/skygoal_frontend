import React, { useState ,useEffect} from 'react'
import { Link,useNavigate} from 'react-router-dom'
import axios from "axios"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import './components.css'

const Login = () => {

    const navigate= useNavigate()

    const [values, setValues] = useState({
      username: "", password: ""
    })
    const {password,username}=values 
  
    const onChangeInput = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }
  
  
    useEffect(()=>{
      if(localStorage.getItem("registeredUser")){
        navigate("/")
      }
    },[])

    const toastOptions={
        position:"top-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
      }
  
    const handaleSubmitEvent =async (e) => {
      
      
        e.preventDefault()
        
        if (username===""){
            toast.error("Username is Required",toastOptions)
            
          }
          else if (password===""){
            toast.error("Password is Required",toastOptions)
           
          }
          
          try{
            
            const {data}=await axios.post("http://localhost:5000/auth/login",{username,password})
            if(data.status===true){
            console.log(data)
            localStorage.setItem("registeredUser",JSON.stringify(data.authenticateLoginUser))
            navigate("/")
            
          }
          if (data.status===false){
            toast.error(data.message,toastOptions)
            
          }
          setValues({
            username: "", password: "",
          })
    
          }
          catch(err){
            toast.error(err,toastOptions)
          }
        }
        
      

    return (
        <div className='mainContainer'>
          <form onSubmit={(e) => handaleSubmitEvent(e)}>
            <h1 className='pageHead'>Login!</h1>
            <div className='inputContainer'>
              <label className='labelHead'>Username</label>
              <input placeholder='Username' value={username} name="username" type='text' className='input' onChange={(e) => onChangeInput(e)} />
            </div>
    
            <div className='inputContainer'>
              <label className='labelHead'>Password</label>
              <input placeholder='Password' value={password} name="password" type='text' className='input' onChange={(e) => onChangeInput(e)} />
            </div>
    
            <button type='submit' className='button'>Login</button>
            <p className='existPara'>Don't have an account? <span><Link to="/signup" className='span'>Register</Link></span></p>
    
          </form>
          <ToastContainer/>
        </div>
      )
}

export default Login