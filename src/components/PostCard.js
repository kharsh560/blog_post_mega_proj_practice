import React from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import appwriteService from "../appwrite/config"
// import authService from "../appwrite/auth";
import service from "../appwrite/config";

function PostCard({ $id, title, featuredImage, userId }) {

  // const userData = useSelector((state) => state.auth.userData);
  // let postAuthor;
  // if (userData.$id === userId) {
  //   postAuthor = userData.name;
  // }

  return (
    <Link to={`/post/${$id}`}>
      {/* In Appwrite, the id is named as "$id" only. Can't do anything about it. */}
      <div className="w-full bg-gray-100 bg-opacity-50 rounded-xl p-4 backdrop-blur-md">
        <div className="w-full justify-center mb-4">
          <img // 11:38
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl transform transition duration-500 hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.8)]" // VVI for shadow look! shadow-[0_4px_15px_rgba(0,0,0,0.8)]
          />
        </div>
        <h2 className="text-xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-800 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
