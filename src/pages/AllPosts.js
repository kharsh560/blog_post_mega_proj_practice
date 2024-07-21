import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components/index";
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
    <div className=" w-full py-8">
      <Container>
        {posts.map((indvPost) => (
          <div key={indvPost.$id} className=" p-2 w-1/4 ">
            <PostCard {...indvPost} />
            {/* Here we wrote "indvPost" like this because we defined the arguments of PostCard as seen below */}
            {/* function PostCard({ $id, title, featuredImage })  */}
          </div>
        ))}
      </Container>
    </div>
  );
}

export default AllPosts;
