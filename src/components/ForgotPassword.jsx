import React, { useState } from 'react'
import { useForm } from "react-hook-form";


const ForgotPassword = () => {

    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [message, setmessage] = useState("")

  const ForgotPassword=async (data) => {
    let res=await fetch("https://passdiary-backend.onrender.com/ForgotPassword",{method:"POST",headers: { 'Content-Type': 'application/json' },body:JSON.stringify({email:data.email})})
    if(res.ok){
      let resjson=await res.json()
      setmessage(resjson.message)
    }
  }
  
  return (
    <div className='h-[calc(100vh-120px)]'>
        <div className="absolute top-0 z-[-2] h-full w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
        
        <div className="container w-19/20 sm:w-3/5 md:w-2/5 mx-auto p-4">

        
          <form className='bg-black/10 flex flex-col gap-2 p-3 text-black' onSubmit={handleSubmit(ForgotPassword)}>
        <h1 className='flex justify-center text-2xl  font-bold'>Forgot password form</h1>
            <label htmlFor="email">Email:</label>
            <input className='bg-white text-black px-2  ' type="text" {...register("email",{required:{value:true, message:"Email is required to proceed"}})}/>
            <button type='submit' className='bg-black text-white active:bg-gray-600 rounded-full ' >Submit</button>
          </form>
        {errors.email && <div className='text-red-600'>{errors.email.message}</div>}
        {message && <div className='text-red-600'>{message}</div>}


        </div>
      
    </div>
  )
}

export default ForgotPassword
