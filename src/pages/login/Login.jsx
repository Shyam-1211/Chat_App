import React, { useState } from 'react'
import './login.css'
import assests from '../../assets/assets'
import { signup , login , resetPass } from '../../config/firebase'
const Login = () => {
    const [curState,setCurrState] = useState("Sign Up")
    const [userName,setUserName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const onSubmitHandler = (e)=>{
          e.preventDefault()
          if (curState === "Sign Up") {
            signup(userName,email,password)
          }
          else{
            login(email,password)
          }
    }

  return (
    <>
    <div className='login'>
    <img src={assests.logo_big} alt="" />
    
    <form onSubmit={onSubmitHandler} className='login-form'>
    <h2>{curState}</h2>
    {curState === "Sign Up"?<input onChange={(e)=>setUserName(e.target.value)} value={userName} type="text" placeholder='Username' className="form-input" required/>:null}
    
    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email' className="form-input" required/>
    <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' className="form-input" required/>
    <button type='sumbit'>{curState === "Sign Up"? "Register" : "Login Now"}</button>

    <div className="login-term">
        {
            curState === "Sign Up"
        }
        <input type="checkbox"/>
        <p>Agree to the terms and conditions</p>
    </div>

    <div className="login-forgot">
        {
        curState === "Sign Up"?<p className="login-toggle">Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>
        :<p className="login-toggle">New? Create Your Account! <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>
        }
        {curState === "Login" ? <p className="login-toggle">Forgot Password?<span onClick={()=>resetPass(email)}>Click Here</span></p>:
        null
        }
        
    </div>
    </form>
    </div>
    </>
  )
}

export default Login