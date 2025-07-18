import React, { useEffect, useState } from "react";




const Navbar = () => {


  return (
    <div className="h-15 bg-black flex justify-around items-center text-white">
      <span className="WebsiteName font-extrabold text-xl">
        <span className="text-yellow-500">&lt;</span>
        <span>pass</span>
        <span className="text-red-700">Diary</span>
        <span>/</span>
        <span className="text-yellow-500">&gt;</span>
      </span>
      <div  className="flex items-center gap-3">
        <div className="w-25 flex justify-center">

        <a href="https://github.com/" target="_blank">

      <div className="group github w-fit flex items-center justify-center gap-2  bg-purple-900 px-1 py-1 rounded-full border-2 border-gray-400">
        <img src="/icons/github.svg" className="w-6 invert-100 group-hover:w-7" alt="github" />
        <span className="font-bold group-hover:font-extrabold"> 
        Github
        </span>

        
        </div>

        </a>

      </div>
     
      </div>

    </div>
        
  );
};

export default Navbar;
