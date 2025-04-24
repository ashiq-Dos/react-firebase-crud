import React, { useEffect, useState } from 'react';
import {auth,googleAuth} from '../Config/firebase'
import { signInWithEmailAndPassword,signInWithPopup,onAuthStateChanged } from 'firebase/auth';
import { Link,useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate =useNavigate()

  useEffect(()=>{
    const unsubsribe =onAuthStateChanged(auth,(user)=>{
      if(user){
        navigate('/blog')
      }
    })
    return ()=> unsubsribe()

  },[navigate])
  const handleSubmit = async () => {

    try{

        await signInWithEmailAndPassword(auth,email,password)
    }
    catch(err){
        console.error(err)
    }

  };

  const SignInWithGoogle = async ()=>{
    try{
        await signInWithPopup(auth,googleAuth)
    }
    catch(err){
        console.error(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Welcome back</h2>

        <div className="flex gap-4 mb-4">
          <button className="flex items-center justify-center w-full border rounded-md py-2 text-black" onClick={SignInWithGoogle}>
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" className="mr-2 " />
            Log in with Google
          </button>
          {/* <button className="flex items-center justify-center w-full border rounded-md py-2 text-black">
            <img src="https://img.icons8.com/ios-filled/20/000000/mac-os.png" alt="Apple" className="mr-2" />
            Log in with Apple
          </button> */}
        </div>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        {/* <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
          <label className="flex items-center">
            <input type="checkbox" className="mr-1" />
            Remember me
          </label>
          <a href="#" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div> */}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account yet?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
