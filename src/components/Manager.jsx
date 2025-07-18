import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Manager = () => {
  const navigate=useNavigate()
  const [url, seturl] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [data, setdata] = useState([]);
  const [render, setrender] = useState(0);
  const [ptype, setptype] = useState("password");
  const handleUrl = (e) => {
    seturl(e.target.value);
  };

  const handleUsername = (e) => {
    setusername(e.target.value);
  };

  const handlePassword = (e) => {
    setpassword(e.target.value);
  };

  const saveToDb = async (data) => {
    let token=localStorage.getItem("token")
    let res = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.log("Failed to save to DB");
      return;
    }
 let resjson= await res.json();

    console.log(resjson)

  };

  const handleClick = async () => {
    await saveToDb({ site: url, username: username, password: password });

    seturl("");
    setusername("");
    setpassword("");
    toast("New Entry made!")
    setrender(!render);
  };

  const handleEdit = async (props) => {
    let c = confirm(
      "The selected tuple will be deleted and editted tuple will be added only if you press the 'Save' button irrespective of whether changes are made or not. Do you want to continue?"
    );
    if (c) {
      seturl(props.site);
      setusername(props.username);
      setpassword(props.password);
      let token=localStorage.getItem("token")
      let res = await fetch(`http://localhost:3000/${props._id}`, {
        method: "DELETE",
        headers: {
    Authorization: `Bearer ${token}`
  }
      });
      let resjson= await res.json();

    console.log(resjson)

      setrender(!render);
    }
  };

  const handleDelete = async (_id) => {
    let c = confirm("Do you want to delete?");
    if (c) {
      let token=localStorage.getItem("token")
      let res = await fetch(`http://localhost:3000/${_id}`, {
        method: "DELETE",
        headers: {
    Authorization: `Bearer ${token}`
  }
      });
      let resjson= await res.json();

    console.log(resjson)

      setrender(!render);
      toast("Deleted successfully!");
    }
  };

  const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
    toast("Copied to clipboard!");
  };
  const showPassword = (e) => {
    if (e.target.src.includes("eyecross.svg")) {
      e.target.src = "/icons/eye.svg";
      setptype("text");
    } else {
      e.target.src = "/icons/eyecross.svg";
      setptype("password");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let token=localStorage.getItem("token")
      console.log(token)
    if(token===null){
      navigate("/SignupandLogin")

    }
    else{

      let res = await fetch("http://localhost:3000/",{
        headers: {
    Authorization: `Bearer ${token}`
  }
      });
      if(res.ok){
         let resjson= await res.json();

    console.log(resjson)

    if(resjson.error==="Token expired"){
      localStorage.clear("token")
      navigate("/SignupandLogin")
      return
    }
    else{
      const passwords =resjson;
      setdata(passwords);
    }
  }

    };}

    fetchData();
  }, [render]);

  const DataCards = (props) => {
    return (
      <>
        <div className="flex justify-center items-stretch text-[10px] sm:text-[15px] ">
          <div className="url  break-all px-2 flex w-1/3 lg:w-1/3 justify-center border-t-[1px] gap-3 border-white bg-purple-200 items-center py-1">
          <a href={props.site} target="_blank">
            {props.site}</a>
            <button onClick={() => handleCopy(props.site)}>
              <lord-icon
                src=" https://cdn.lordicon.com/iykgtsbt.json"
                trigger="click"
                stroke="bold"
                colors="primary:#121331,secondary:#8930e8"
                className="w-5 h-5   cursor-pointer "
              ></lord-icon>
            </button>
          </div>
          <div className="username break-all px-2  flex w-1/4 lg:w-1/5 justify-center border-t-[1px] gap-3 border-white bg-purple-200 items-center py-1">
            {props.username}
            <button onClick={() => handleCopy(props.username)}>
              <lord-icon
                src=" https://cdn.lordicon.com/iykgtsbt.json"
                trigger="click"
                stroke="bold"
                colors="primary:#121331,secondary:#8930e8"
                className="w-5 h-5  cursor-pointer "
              ></lord-icon>
            </button>
          </div>
          <div className="password  break-all px-2 flex  w-1/4 lg:w-1/5 justify-center border-t-[1px] border-white gap-3 bg-purple-200 items-center py-1">
            {"*".repeat(props.password.length)}
            <button onClick={() => handleCopy(props.password)}>
              <lord-icon
                src=" https://cdn.lordicon.com/iykgtsbt.json"
                trigger="click"
                stroke="bold"
                colors="primary:#121331,secondary:#8930e8"
                className="w-5 h-5  cursor-pointer "
              ></lord-icon>
            </button>
          </div>

          <div className="actions  break-all flex w-1/5 lg:w-1/10 justify-center border-t-[1px] border-white  bg-purple-200 items-center gap-2 py-1">
            <button onClick={() => handleEdit(props)}>
              <lord-icon
                src="https://cdn.lordicon.com/fikcyfpp.json"
                trigger="click"
                stroke="bold"
                colors="primary:#121331,secondary:#8930e8"
                className="w-5 h-5  cursor-pointer "
              ></lord-icon>
            </button>
            <button onClick={() => handleDelete(props._id)}>
              <lord-icon
                src="https://cdn.lordicon.com/jzinekkv.json"
                trigger="click"
                stroke="bold"
                colors="primary:#121331,secondary:#8930e8"
                className="w-5 h-5  cursor-pointer "
              ></lord-icon>
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="h-[calc(100vh-120px)]">
      <ToastContainer/>

      <div className="absolute top-0 z-[-2] h-full w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <div className="content w-4/5 h-full bg-purple-800/10 mx-auto flex flex-col justify-start items-center gap-4">
        <span className="text-2xl font-extrabold">
          <span className="text-yellow-500">&lt;</span>
          <span>pass</span>
          <span className="text-red-700">Diary</span>
          <span>/</span>
          <span className="text-yellow-500">&gt;</span>
        </span>
        <span className="text-xl font-light">
          Save and access your passwords on the go using your own passDiary...
        </span>
        <div className="newdata w-full flex flex-col gap-2 pt-4 px-10 sm:px-40 items-center">
          <input
            className="bg-white outline-1 outline-purple-800 focus:outline-black focus:outline-2 w-full px-3 rounded-2xl "
            type="text"
            name=""
            placeholder="Enter website URL"
            onChange={handleUrl}
            value={url}
          />
          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between w-full">
            <input
              className="bg-white outline-1 outline-purple-800 focus:outline-black focus:outline-2  px-3 rounded-2xl  lg:w-6/11"
              type="text"
              name=""
              placeholder="Enter your Username"
              onChange={handleUsername}
              value={username}
            />

            <div className="relative lg:w-2/5 flex">
              <input
                className="bg-white outline-1 outline-purple-800 focus:outline-black focus:outline-2 px-3 pr-8 rounded-2xl  w-full "
                type={ptype}
                name=""
                placeholder="Enter your Password"
                onChange={handlePassword}
                value={password}
              />
              <img
                src="/icons/eyecross.svg"
                className="absolute right-2 top-1 w-[15px] cursor-pointer"
                alt="hidden"
                onClick={showPassword}
              />
            </div>
          </div>

          <button
            className="bg-purple-400 group flex justify-center gap-2 items-center text-white w-fit px-4 py-1 rounded-full disabled:bg-purple-300  cursor-pointer "
            disabled={
              !url.length || !username.length || !password.length ? true : false
            }
            onClick={handleClick}
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="click"
              colors="primary:#000000"
            ></lord-icon>
            <span className="font-bold text-black">Save</span>
          </button>
        </div>

        <hr className="text-white font- w-full" />

        <div className="savedData w-full h-4/6 p-3 flex flex-col justify-start">
          <h1 className="text-xl font-bold text-purple-800 ">Saved records</h1>

          {data.length === 0 && <span>No records found</span>}

          {data.length !== 0 && (
            <div className="list my-5 h-7/10 overflow-y-scroll scrollbar-visible">
              <div className="flex justify-center items-stretch text-white font-bold text-[10px] sm:text-[15px] ">
                <div className="url flex w-1/3 lg:w-1/3 justify-center  py-1 bg-purple-700 items-center">
                  Site
                </div>
                <div className="username flex w-1/4 lg:w-1/5 justify-center py-1  bg-purple-700 items-center">
                  Username
                </div>
                <div className="password flex w-1/4 lg:w-1/5 justify-center py-1 bg-purple-700 items-center">
                  Password
                </div>

                <div className="actions flex w-1/5 lg:w-1/10 justify-center  py-1 bg-purple-700 items-center">
                  Actions
                </div>
              </div>

              {data.map((item) => {
                return <DataCards key={item._id} {...item} />;
              })}
            </div>
          )}
        </div>
      </div>

       <button   className="bg-red-600 px-3 py-1 rounded-full font-bold border-2 border-white cursor-pointer active:bg-red-800 fixed top-3 right-3 text-white" onClick={()=>{localStorage.clear('token') ,setrender(!render)}}>Logout</button>
    </div>
  );
};

export default Manager;
