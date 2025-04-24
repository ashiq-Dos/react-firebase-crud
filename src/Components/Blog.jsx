import React, { useEffect, useState } from 'react';
import { auth, db, } from '../Config/firebase'
import { collection, getDocs,doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth'
import {Link} from 'react-router-dom'

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const unsubscribe= onAuthStateChanged(auth,(user)=>{
      if (user){
        getPosts(user.uid)
      }
      else {
        setLoading(false)
      }
    })
    return ()=>unsubscribe()
  },[])


  const getPosts = async (userId) => {
    try{


    const postCollectionRef = collection(db, 'posts');
    const data = await getDocs(postCollectionRef);
    const userPosts = data.docs
    .map((doc) => ({ ...doc.data(), id: doc.id }))
    .filter((post) => post.userId === userId);
    setPosts(userPosts);

    }
    catch(err){
      console.error(err)
    }
    finally{
      setLoading(false)
    }
  };



  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (confirm) {
      try {
        const postDocRef = doc(db, 'posts', id);
        await deleteDoc(postDocRef);
        setPosts(posts.filter((post) => post.id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  if(loading){
    return <div className="text-center mt-10">Loading posts...</div>; 
  }
  return (
<div className="flex flex-col items-center justify-center min-h-screen space-y-6 mt-10">
    {posts.length === 0 ? (
      <p className="text-gray-500">No posts found.</p>
    ) : (
      posts.map((post) => (
        <div key={post.id} className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            {post.title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
            {post.description}
          </p>
          <div className="flex justify-center space-x-2">
          <Link to={`/update-post/${post.id}`}>
          <button className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">
            Update
          </button>
        </Link>
            <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400" onClick={() => handleDelete(post.id)}>
              Delete
            </button>
          </div>
        </div>
      ))
    )}
  </div>
  );
};

export default Blog;
