import React from "react";
import { Link } from "react-router-dom";
// import appwriteService from "../appwrite/config"
// import authService from "../appwrite/auth";
import service from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      {/* In Appwrite, the id is named as "$id" only. Can't do anything about it. */}
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img // 11:38
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
