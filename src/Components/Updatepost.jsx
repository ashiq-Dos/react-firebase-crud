import React,{useEffect, useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Config/firebase';


const Updatepost = () => {
    const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate=useNavigate()
  useEffect(() => {
    const getPost = async () => {
      const postRef = doc(db, 'posts', id);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        setTitle(postSnap.data().title);
        setDescription(postSnap.data().description);
      }
    };

    getPost();
  }, [id]);

  const handleUpdate = async () => {
    const postRef = doc(db, 'posts', id);
    await updateDoc(postRef, { title, description });
    navigate('/blog')
    alert('Post updated!');
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Update New Post</h2>

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
            className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleUpdate}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2.5 rounded-lg transition duration-300"
        >
          Update Post
        </button>
      </div>
    </div>
  )
}

export default Updatepost