import { useState } from "react";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RegisterOrLogin from "./components/RegisterOrLogin";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import EmailVerification from "./components/EmailVerification";
function App() {
  const myrouter = createBrowserRouter([
    {
      path: "/SignupandLogin",
      element: <RegisterOrLogin />,
    },
    {
      path: "/ForgotPassword",
      element: <ForgotPassword />,
    },
    {
      path: "/",
      element: <Manager />,
    },{
      path:"/ResetPassword",
      element:<ResetPassword/>
    },{
      path: "/EmailVerification",
      element: <EmailVerification />,
    },
  ]);

  return (
    <div>
      <Navbar />
      <RouterProvider router={myrouter} />
      <Footer />
    </div>
  );
}

export default App;
