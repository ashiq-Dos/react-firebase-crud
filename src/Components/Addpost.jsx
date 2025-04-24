import React, { useState } from 'react'
import { auth, db, } from '../Config/firebase'
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid'

const Addpost = () => {
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    // const [ImageUpload,setImageUpload]=useState(null)
    const navigate = useNavigate()


    const handleSubmit = async(e)=>{
        e.preventDefault()

        try{
            const user = auth.currentUser;
            if(!user){
                alert("Please logged in")
            }

            // const imageRef = ref(storage,`images/${ImageUpload.name+v4()}`)
            // await uploadBytes(imageRef,ImageUpload)
            // const imageURL = await getDownloadURL(imageRef);

            await addDoc(collection(db, 'posts'), {
                title,
                description,
                // imageURL,
                userId:user.uid,
                createdAt:new Date()
        })
        
        navigate('/blog')

    }
    catch(err){
        console.error(err);
        alert("Error adding post");
    }


    }
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New Post</h2>

        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="Enter post title"
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows="5"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder="Enter post description"
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          ></textarea>
        </div>

        {/* Image Upload */}
        {/* <div className="mb-4">
          <label htmlFor="imageUpload" className="block mb-2 text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            id="imageUpload"
            onChange={(e)=>setImageUpload(e.target.files[0])}
            className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2.5 rounded-lg transition duration-300"
        >
          Submit Post
        </button>
      </form>
    </div>
  )
}

export default Addpost
