import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components/index";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  //   18:02 min se:

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full ">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((indvPost) => (
            <div key={indvPost.$id} className="p-2 w-1/4">
              <PostCard {...indvPost} />
              {/* Here we wrote "indvPost" like this because we defined the arguments of PostCard as seen below */}
              {/* function PostCard({ $id, title, featuredImage })  */}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
