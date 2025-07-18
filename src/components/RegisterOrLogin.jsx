import { Error } from "mongoose";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const RegisterOrLogin = () => {
  const navigate=useNavigate()
  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    setError:setErrorSignup,
    clearErrors:clearSignupErrors,
    reset:resetSignup,
    formState: { errors: errorsSignup, isSubmitting:isSubmittingSignup },
  } = useForm();


  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    setError:setErrorLogin,
    clearErrors:clearLoginErrors,
    reset:resetLogin,
    formState: { errors: errorsLogin, isSubmitting:isSubmittingLogin },
  } = useForm();

const [message, setmessage] = useState("")
  const [left, setleft] = useState("left-0");
 

  const signup = useRef(null);
  const login = useRef(null);

  const handleToggle = (e) => {
    if (e.target.id === "sign") {
      setleft("left-0");
      signup.current.classList.add("bg-pink-300/40")
      login.current.classList.remove("bg-pink-300/40")
    } else {
      setleft("left-[calc(-100%)]");
      signup.current.classList.remove("bg-pink-300/40")
      login.current.classList.add("bg-pink-300/40")
    }
  };

  const signupSubmit =async (data) => {

    console.log("Signup Initiated...")
    
   setmessage("")

    if(data.cnfpassword!==data.password){
      setErrorSignup("signupError",{message:"Password and confirm password field did not match"})
      console.log("111")
    }
    else{

      const signupRes=await fetch("https://passdiary-backend.onrender.com/Signup",{
        method:"POST",
       headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
      })

      if(signupRes.ok){
        let resjson=await signupRes.json()
        if(resjson.error==="User already exists"){
          setErrorSignup("signupError",{message:"User already exists"})
        }
        else{
          setmessage(resjson.message)
          resetSignup()

        }
      }

    }

    
  };
  const loginSubmit =async (data) => {
    try{
     
    console.log(data)
    const loginRes=await fetch("https://passdiary-backend.onrender.com/Login",{
        method:"POST",
       headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})

      if(loginRes.ok){
        let resjson=await loginRes.json();
       if(resjson.error==="No user found"){
        setErrorLogin("loginError",{message:"User does not exist"})
        return
        
       }
       else if (resjson.error==="Password incorrect"){
        setErrorLogin("loginError",{message:"Incorrect password"})
        return
        
       }
       else{
        console.log(resjson)
        resetLogin()
        localStorage.setItem("token",resjson.token)
        navigate("/")
       }


      }
    }catch(error){
      console.log(error)
    }

  }

  const forgotPassword=() => {
    navigate("/ForgotPassword")
  }
  

  useEffect(() => {
    signup.current.focus();
  }, []);

  return (
    <div className="h-[calc(100vh-120px)]">
      <div className="absolute top-0 z-[-2] h-full w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

      <div className="main w-3/4 sm:w-1/3 lg:w-2/5 bg-black/50 mx-auto text-white relative top-20 overflow-hidden h-5/7 rounded-2xl ">
        <div className="toggle flex justify-between">
          <button
            id="sign"
            ref={signup}
            className="bg-pink-300/40 px-2 rounded-tr-2xl py-1 outline-0"
            onClick={handleToggle}
          >
            Sign up
          </button>
          <button
          ref={login}
            className="px-2 rounded-tl-2xl py-1 outline-0"
            onClick={handleToggle}
          >
            Log in
          </button>
        </div>
        <div
          className={`container transition-all duration-[500ms]  flex justify-between w-[calc(2*100%)] h-9/10 bg-pink-300/40 absolute ${left}`}
        >
          <form
            className="signup w-11/23 flex flex-col items "
            onSubmit={handleSignupSubmit(signupSubmit)}
          >
            <h1 className=" font-bold text-3xl text-black  mx-auto  ">Sign up form</h1>
            <div className="emaildiv flex flex-col py-2 pl-4">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                className="bg-white m-1 text-black px-2"
                {...registerSignup("email", {
                  required: {
                    value: true,
                    message: "Email required",
                  },
                })}
                placeholder="Email address..."
              />
            </div>
            <div className="passworddiv  flex flex-col py-2 pl-4">
              <label htmlFor="password">Password:</label>
              <input
                className="bg-white m-1 text-black px-2"
                placeholder="Password..."
                type="text"
                {...registerSignup("password", {
                  required: {
                    value: true,
                    message: "Password required",
                  },
                  minLength: {
                    value: 8,
                    message: "Min length is 8 characteres",
                  },
                  maxLength: {
                    value: 16,
                    message: "Max length is 16 characteres",
                  },
                })}
              />
            </div>
            <div className="cnfpassworddiv flex flex-col py-2 pl-4">
              <label htmlFor="cnfpassword">Confirm password:</label>
              <input
                className="bg-white m-1 text-black px-2"
                type="text"
                placeholder="Confirm password..."
                {...registerSignup("cnfpassword")}
              />
              <input type="text" {...registerSignup("signupError")} hidden />
            </div>
            <button
              type="submit" disabled={isSubmittingSignup}
              className="bg-black my-3 ml-3 py-2 rounded-full focus:bg-blue-900 cursor-pointer"
            >
              {" "}
              Sign up
            </button>
          </form>

          <form className="login w-11/23 flex flex-col items " onSubmit={handleLoginSubmit(loginSubmit)}>
            <h1 className=" font-bold text-3xl text-black  mx-auto  ">Log in form</h1>

            <div className="emaildiv flex flex-col py-2 pr-4">
              <label htmlFor="email2">Email:</label>
              <input
                className="bg-white m-1 text-black px-2"
                type="text"
                {...registerLogin("email2", { required: {value:true, message:"Enter email"} })}
                placeholder="Email address...."
               
              />
            </div>
            <div className="passworddiv flex flex-col py-2 pr-4">
              <label htmlFor="password2">Password:</label>
              <input
                className="bg-white m-1 text-black px-2"
                type="text"
                placeholder="Password..."
               {...registerLogin("password2", { required: {value:true, message:"Enter password"} })}
              />
              <span className=" text-blue-800 cursor-pointer pl-4" onClick={forgotPassword}>
                Forgot Password?
                <input type="text" hidden={true} {...registerLogin("loginError")} />
           
              </span>
            </div>
            <button type="submit" className="bg-black my-5 mr-4 py-2 rounded-full focus:bg-blue-900 cursor-pointer" disabled={isSubmittingLogin}>
              {" "}
              Log in
            </button>
          </form>
        </div>
      <div className="text-red-600 absolute bottom-3 left-2">
        {errorsSignup.email && <div>{errorsSignup.email.message}</div>}
        {errorsSignup.password && <div>{errorsSignup.password.message}</div>}
        {errorsSignup.signupError && <div>{errorsSignup.signupError.message}</div>}
        {errorsLogin.email2 && <div>{errorsLogin.email2.message}</div>}
        {errorsLogin.password2 && <div>{errorsLogin.password2.message}</div>}
        {errorsLogin.loginError && <div>{errorsLogin.loginError.message}</div>}
        {message&& <div>{message}</div> }

      </div>
      </div>
    </div>
  );
};

export default RegisterOrLogin;
