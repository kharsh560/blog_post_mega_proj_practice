import React, { useEffect, useState } from "react";
import { PostCard } from "../components/index";
// We also need Appwrite service as we will need to query for the posts for a user.
import service from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  // Note: Sir passed an empty array with getPosts' parameters, but I didn't. Because sir wrote the Queries inside getPosts' arguments only, but I didn't.

  // 9:30 min se "return" part
  return (
    <div className="bg-animated min-h-screen w-screen py-4 ">
      <div className="flex justify-center font-bold text-4xl pb-2">
        <h1 className="w-fit bg-gradient-to-r from-blue-800 via-black to-red-700 bg-clip-text text-transparent">
          All Blogs
        </h1>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {posts.map((indvPost) => (
          <div key={indvPost.$id} className=" h-fit p-2">
            <PostCard {...indvPost} />
            {/* Here we wrote "indvPost" like this because we defined the arguments of PostCard as seen below */}
            {/* function PostCard({ $id, title, featuredImage })  */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPosts;
