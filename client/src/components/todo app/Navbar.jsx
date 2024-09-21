import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';
import { UserAuthAction } from '../../store/userStore/userAuth';
import {todoAppActions} from '../../store/todoStore/todoAPP.js'

const Navbar = () => {
  const userData = useSelector((state) => state.userAuthStore); // Get user data from Redux store
  const dispatch = useDispatch()


   const handleLogout = ()=>{
     dispatch(UserAuthAction.logout())
     dispatch(todoAppActions.logout())
   }

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center flex-wrap ">
        {/* Logo or Brand Name */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">MyTodoApp</Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-4 flex flex-row justify-center">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          {
            !userData?(  
                <div className='flex flex-row justify-center gap-3'>
                   <Link to="/signin" className="text-white hover:text-gray-300">
          Sign in
        </Link>
        <Link to="/login" className="text-white hover:text-gray-300">
          Login
        </Link>
               </div>
            ):(
              <button className="text-white hover:text-gray-300"
               onClick={handleLogout}
              >
                   log out
              </button>
            )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
