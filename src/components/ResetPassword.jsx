import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate=useNavigate()

const [message, setmessage] = useState("")

const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const token = queryParams.get('token');

  const ResetPassword = async (data) => {

    let res = await fetch("http://localhost:3000/ResetPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token:token, newPassword:data.newPassword }),
    });

    if(res.ok){

        let resjson=await res.json()

        if(resjson.message==="User not found"){
            setmessage("User not found")
        }
        else if(resjson.message==="Token expired"){
            setmessage("Token expired")
        }
        else if (resjson.message==="Invalid token"){
        setmessage("Invalid token")
        }else{
            // navigate("/")
            setmessage("Password reset successful")
            navigate("/")
        }

    }
  };

  return (
    <div className="h-[calc(100vh-120px)]">
      <div className="absolute top-0 z-[-2] h-full w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

      <div className="container w-19/20 sm:w-3/5 md:w-2/5 mx-auto p-4">
        <form
          className="bg-black/10 flex flex-col gap-2 p-3 text-black"
          onSubmit={handleSubmit(ResetPassword)}
        >
          <h1 className="flex justify-center text-2xl font-bold">
            Reset password form
          </h1>
          <label htmlFor="email">New Password:</label>
          <input
            className="bg-white text-black px-2"
            type="text"
            {...register("newPassword", {
              required: {
                value: true,
                message: "Password is required to proceed",
              },
              minLength: { value: 8, message: "Min length is 8" },
              maxLength: { value: 16, message: "Max length is 16" },
            })}
          />
          <button type="submit" className="bg-black text-white active:bg-gray-600 rounded-full">Submit</button>
        </form>
        {errors.newPassword && <div className="text-red-600">{errors.newPassword.message}</div>}
        {message && <div className="text-red-600">{message}</div>}


      </div>
    </div>
  );
};

export default ResetPassword;
