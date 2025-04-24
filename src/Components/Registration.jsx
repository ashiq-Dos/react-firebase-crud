import React, { useState } from "react";
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth,db} from "../Config/firebase"
import {doc, setDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom";

const Registeration = () => {

    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const navigate=useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth,email,password)
            const user = userCredential.user

            await setDoc(doc(db, "Users", user.uid), {
              email: user.email,
              createdAt: new Date(),
            });
            alert("User registered successfully!");
            navigate('/blog')
        }


    catch(error){
        alert("Error: " + error.message);
    }
}

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create your Free Account
        </h2>





        <form>
          {/* Email */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your email
          </label>
          <input
            type="email"
            placeholder="Please Enter Your Password"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />

          {/* Password */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Please Enter Your Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registeration;
