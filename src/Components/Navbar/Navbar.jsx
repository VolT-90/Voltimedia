import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authcontext } from "../Context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { token , clearUserToken } = useContext(authcontext)
  const navigate = useNavigate()


  // <-----------------Handle Logout---------------->
  function handleLogout(){
  localStorage.removeItem('tkn');
  clearUserToken();
  navigate('/')
}

  return (


    
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between relative">
        
        {/* Left - Logo */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <i className="fa-solid fa-bolt text-blue-700" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Voltmedia
          </span>
        </Link>

        {token && <>

        {/* Center - Home Icon */}
        <Link
          to="/home"
          data-state={location.pathname === "/home" ? "active" : "inactive"}
          className="data-[state=active]:text-blue-700 absolute left-1/2 -translate-x-1/2 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
        >
          <i className="fa-solid fa-house-user text-3xl" />
        </Link>


        {/* Right - Menu */}
        <div className={`${isOpen ? "block" : "hidden"} md:block absolute md:static top-full right-0 md:right-auto bg-white md:bg-transparent dark:bg-gray-900 md:dark:bg-transparent w-full md:w-auto shadow-md md:shadow-none`}>
          <ul className="font-medium flex flex-col md:flex-row items-center md:space-x-4 p-4 md:p-0">
            <li>
              
              <Link
                to="/profile"
                data-state={location.pathname === "/profile" ? "active" : "inactive"}
                className="data-[state=active]:text-blue-700 block py-2 px-3 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
              >
                <i className="fa-solid fa-user text-3xl" />
              </Link>
            </li>
             <li>
                <button onClick={handleLogout} className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-colors">
                  Logout
                </button>
            </li>
          </ul>
        </div>

        </>}

        {!token && <>
                    <div
            className={`${
              isOpen ? "block" : "hidden"
            } md:block absolute md:static top-full right-0 md:right-auto bg-white md:bg-transparent dark:bg-gray-900 md:dark:bg-transparent w-full md:w-auto shadow-md md:shadow-none`}
          >
            <ul className="font-medium flex flex-col md:flex-row items-center md:space-x-4 p-4 md:p-0">
              <li>
                <Link to="/">
                  <button className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mb-2 md:mb-0 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-colors">
                    Login
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <button className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mb-2 md:mb-0 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-colors">
                    Register
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </>

        }

                

        {/* Mobile Hamburger */}
        
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"} text-xl`} />
        </button>
        </div>

    </nav>
  );
}
