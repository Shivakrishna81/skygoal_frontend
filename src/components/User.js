import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './components.css'

const User = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState("")
    console.log(user)

    useEffect(()=>{
       const details=localStorage.getItem("registeredUser")
       if (!details){
          navigate("/login")
          setUser(details)
       }
       setUser(JSON.parse(details))
    },[])

    return (
        <div className='mainContainer'>
            <div className='userDetails'>
                {user? <h1>{`Hello ${user.username}!!`}</h1>:<h1>No user Found!!</h1>}         
            </div>
        </div>
    )
}

export default User