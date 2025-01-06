import React, { useState } from 'react'
import assests from '../../assets/assets'
import { signup, login, resetPass } from '../../config/firebase'

const Login = () => {
    const [curState, setCurrState] = useState("Sign Up")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (curState === "Sign Up") {
            signup(userName, email, password)
        }
        else {
            login(email, password)
        }
    }

    return (
        <>
            <div className=" flex-wrap min-h-screen bg-cover bg-no-repeat bg-[url('/background.png')] flex items-center justify-evenly">
                <img className="w-[max(20vw,200px)]" src={assests.logo_big} alt="Logo"  />

                <form className="bg-white p-6 flex flex-col gap-5 rounded-xl" onSubmit={onSubmitHandler} >
                    <h2 className="font-medium">{curState}</h2>
                    {curState === "Sign Up" && (
                        <input
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            type="text"
                            placeholder="Username"
                            className="p-2 border border-[#c9c9c9] rounded-md outline-[#077EFF]"
                            required
                        />
                    )}

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Email"
                        className="p-2 border border-[#c9c9c9] rounded-md outline-[#077EFF]"
                        required
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Password"
                        className="p-2 border border-[#c9c9c9] rounded-md outline-[#077EFF]"
                        required
                    />
                    <button type="submit" className="py-2 bg-[#077EFF] text-white text-[16px] rounded-md cursor-pointer">
                        {curState === "Sign Up" ? "Register" : "Login Now"}
                    </button>

                    <div className="flex gap-2 text-[12px] text-[#808080]">
                        {curState === "Sign Up" && (
                            <>
                                <input type="checkbox" />
                                <p>Agree to the terms and conditions</p>
                            </>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        {curState === "Sign Up" ? (
                            <p className="text-[13px] text-[#5c5c5c]">
                                Already have an account? <span onClick={() => setCurrState("Login")} className="font-medium text-[#077EFF] cursor-pointer">Login Here</span>
                            </p>
                        ) : (
                            <p className=" text-[13px] text-[#5c5c5c]">
                                New? Create Your Account! <span onClick={() => setCurrState("Sign Up")} className="font-medium text-[#077EFF] cursor-pointer">Click Here</span>
                            </p>
                        )}
                        {curState === "Login" && (
                            <p className="text-[13px] text-[#5c5c5c]">
                                Forgot Password? <span onClick={() => resetPass(email)} className="font-medium text-[#077EFF] cursor-pointer">Click Here</span>
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
