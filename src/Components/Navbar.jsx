import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {auth} from '../Config/firebase'
import { signOut,onAuthStateChanged } from 'firebase/auth';


const Navbar = () => {

    const [user,setUser]=useState(null)
    const navigate=useNavigate()

    useEffect(()=>{
        const unsubsribe = onAuthStateChanged(auth,(user)=>{
            setUser(user)
        })
        return ()=> unsubsribe()
    },[])




    const handlesignOut = async()=>{
        try{
            await signOut(auth)
            navigate('/')
        }
        catch(err){
            console.error(err)
        }
    }
  return (
    <nav className="border-b border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Blog Logo */}
        <a href="#" className="flex items-center space-x-2">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/blog.png" // Replace with your own logo if needed
            alt="Blog Logo"
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            MyBlog
          </span>
        </a>

         {/* Button Group */}
         {user&&(
         <div className="flex space-x-4">
          {/* Add Post Button */}
          <Link
            to="/add-post"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200"
            >
            Add Post
            </Link>


          {/* Sign Out Button */}
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-200" onClick={handlesignOut}>
            Sign Out
          </button>
        </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
