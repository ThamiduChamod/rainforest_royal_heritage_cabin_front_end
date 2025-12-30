import React, { useState, useEffect, type FormEvent } from 'react';
import {login, register} from "../services/auth"
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate()

  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Page එක load වූ සැනින් animation එක පටන් ගැනීමට
    setTimeout(() => setIsLoaded(true), 200);
  }, []);


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [firstName, setFistName] = useState("")
  const [lastName, setLastName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [OTP, setOTP] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("USER")

  
  const handelSignIn = async ()=>{
    console.log(email)
    console.log(password)

    if (!email || !password ){
      alert("All fields are re...")
      return
    }

    // try{
      // const res = await login(email, password)

      // console.log(res.data.accessToken)

      // if(!res.data.accessToken){
        // alert("Login fail")
        return
      // }

      // await localStorage.setItem("accessToken", res.data.accessToken)
      // await localStorage.setItem("accessToken", res.data.refreshToken)
      
      // navigate("/Home")

    // }catch(err){
      // console.error(err)
    // }

  }


  const handelRegister = async (e: FormEvent) => {

    console.log("aaaaaa")
    if(!firstName || !lastName || !registerEmail || !OTP || !registerPassword || !confirmPassword){
      alert("All fields are re...")
      return
    }

    const user = {
      firstName,
      lastName,
      registerEmail,
      registerPassword,
      role      
    }

    try{
      const res = await register(user)

      console.log(res.data)
      console.log(res.message)

    }catch(err: any){
      console.error(err?.response?.data)
    }
  }





  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden font-sans">
      
      {/* --- Moving Background Layer --- */}
      <div 
        className={`absolute top-0 right-1/2 h-screen w-[400vw] z-10 transition-transform duration-[1500ms] ease-in-out shadow-2xl
          bg-gradient-to-br from-[#4EA685] to-[#57B894] hidden md:block
          ${isSignIn ? 'translate-x-0 rounded-br-[50vw] rounded-tl-[50vw]' : 'translate-x-full rounded-bl-[50vw] rounded-tr-[50vw]'}
        `}
      />

      <div className="relative flex h-screen w-full">
        
        {/* --- Left Column (Sign In / Welcome Join) --- */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center z-20 transition-all duration-700">
          
          {/* Sign In Form */}
          <div className={`w-full max-w-xl p-8 transition-all duration-700 delay-500
            ${isSignIn ? 'scale-100 opacity-100' : 'scale-0 opacity-0 absolute pointer-events-none'}`}>
            <div className="bg-white p-8 rounded-3xl shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
              <input type="text" placeholder="Username" className="w-full p-3 mb-6 bg-gray-100 rounded-lg outline-none border-2 border-transparent focus:border-[#4EA685] transition" 
                value={email}
                onChange={(e) => setEmail (e.target.value)}
              />
              <input type="password" placeholder="Password" className="w-full p-3 mb-6 bg-gray-100 rounded-lg outline-none border-2 border-transparent focus:border-[#4EA685] transition" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handelSignIn} className="w-full bg-[#4EA685] text-white py-3 rounded-lg font-bold hover:bg-[#3d8b6e] transition duration-300">Sign In</button>
              <p className="mt-4 text-xs text-center text-gray-500">
                Don't have an account? <span onClick={() => setIsSignIn(false)} className="cursor-pointer text-[#4EA685] font-bold">Sign up here</span>
              </p>
            </div>
          </div>

          {/* Welcome Text (For Sign Up Mode) */}
          <div className={`hidden md:block text-[#515352] text-center transition-all duration-1000
            ${!isSignIn ? 'translate-x-0 opacity-100' : 'translate-x-[-150%] opacity-0 absolute'}`}>
            <h2 className="text-5xl font-extrabold mb-4">Welcome Back!</h2>
            <p className="px-10">දිගටම අප සමග රැඳී සිටීමට ඔබගේ තොරතුරු ඇතුළත් කර ලොග් වන්න.</p>
          </div>
        </div>

        {/* --- Right Column (Sign Up / Join Us) --- */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center z-20">
          
          {/* Sign Up Form */}
          <div className={`w-full max-w-xl p-8 transition-all duration-700 delay-500
            ${!isSignIn ? 'scale-100 opacity-100' : 'scale-0 opacity-0 absolute pointer-events-none'}`}>
            <div className="bg-white p-8 rounded-3xl shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
              <input type="text" placeholder="First Name" className="w-full p-3 mb-6 bg-gray-100 rounded-lg outline-none border-2 border-transparent focus:border-[#4EA685] transition" 
                value={firstName}
                onChange={(e)=> setFistName(e.target.value)}
              />
              <input type="text" placeholder="Last Name" className="w-full p-3 mb-6 bg-gray-100 rounded-lg outline-none border-2 border-transparent focus:border-[#4EA685] transition" 
                value={lastName}
                onChange={(e)=> setLastName(e.target.value)}
              />
              <input type="email" placeholder="Email" className="w-full p-3 mb-6 bg-gray-100 rounded-lg outline-none border-2 border-transparent focus:border-[#4EA685] transition" 
                value={registerEmail}
                onChange={(e)=> setRegisterEmail(e.target.value)}
              />
              <input type="number" placeholder="OTP" className="w-full p-3 mb-6 bg-gray-100 rounded-lg outline-none border-2 border-transparent focus:border-[#4EA685] transition" 
                value={OTP}
                onChange={(e)=> setOTP(e.target.value)}
              />
              <input type="password" placeholder="Password" className="w-full p-3 mb-6 bg-gray-100 rounded-lg outline-none border-2 border-transparent focus:border-[#4EA685] transition" 
                value={registerPassword}
                onChange={(e)=> setRegisterPassword(e.target.value)}
              />
              <input type="password" placeholder="Confirm Password" className="w-full p-3 mb-6 bg-gray-100 rounded-lg outline-none border-2 border-transparent focus:border-[#4EA685] transition" 
                value={confirmPassword}
                onChange={(e)=> setConfirmPassword(e.target.value)}
              />
              <button className="w-full bg-[#4EA685] text-white py-3 rounded-lg font-bold hover:bg-[#3d8b6e] transition duration-300"
                onClick={handelRegister}
              >
                Sign Up
              </button>
              <p className="mt-4 text-xs text-center text-gray-500">
                Already have an account? <span onClick={() => setIsSignIn(true)} className="cursor-pointer text-[#4EA685] font-bold">Sign in here</span>
              </p>
            </div>
          </div>

          {/* Join Us Text (For Sign In Mode) */}
          <div className={`hidden md:block text-[#515352] text-center transition-all duration-1000
            ${isSignIn ? 'translate-x-0 opacity-100' : 'translate-x-[150%] opacity-0 absolute'}`}>
            <h2 className="text-5xl font-extrabold mb-4">Join With Us</h2>
            <p className="px-10">අදම අප හා සම්බන්ධ වී නවතම සේවාවන් අත්විඳින්න.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;