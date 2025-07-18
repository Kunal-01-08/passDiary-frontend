import { Error } from "mongoose";
import React, { useState, useRef, useEffect } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";


const EmailVerification = () => {
    const [message, setmessage] = useState("")
    
    
const location = useLocation();
const queryParams =new URLSearchParams(location.search);
let email = queryParams.get('email');

    useEffect(() => {
        let func = async ()=>{

            let res = await fetch("https://passdiary-backend.onrender.com/EmailVerification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    
                },
                body: JSON.stringify({email:email}),
            });

    

            if(res.ok){
                let resjson=await res.json()
                setmessage(resjson.message)
            }
        }
        
        func()

    }, [])
    

  return (
    <div className="h-[calc(100vh-120px)]">
      <div className="absolute top-0 z-[-2] h-full w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

     <div className="text-2xl mx-auto w-fit py-4 text-red-600">{message}</div>
    </div>
  );
};

export default EmailVerification;
