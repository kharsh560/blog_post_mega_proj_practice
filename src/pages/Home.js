import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
  // Jab tak login hoga nahi user, tab tak toh userData aayega hee nahi na!
  const userData = useSelector((state) => state.auth.userData);

  // const userDataId = userData.$id;
  // console.log(
  //   `${userData.$id}
  //   ${posts.length}
  //   ${posts[0].userId} -> ${posts[0].$id}
  //   ${posts[1].userId} -> ${posts[1].$id}`
  // );
  // OUTPUT:-
  // 669ce8ea00142e2a8b3f
  // 2
  // 669c1a280025e0071e37 -> a-horror-story
  // 669ce8ea00142e2a8b3f -> a-family-story
  // NOTE: So, you can see, indvPost.userId is only the user's current session's Id attached to it.
  // So as per this knowledge, let's filter out the user's own blogs.
  let userPosts;
  if (userData) {
    userPosts = posts.filter((indvPost) => userData.$id === indvPost.userId);
  }
  console.log(userPosts);
  // -> Gotcha :-)

  if (posts.length === 0) {
    //   18:02 min se:
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

  // return (
  //   <div className="w-full py-8">
  //     <Container>
  //       <div className="flex flex-wrap">
  //         {posts.map((indvPost) => (
  //           <div key={indvPost.$id} className="p-2 w-1/4">
  //             <PostCard {...indvPost} />
  //             {/* Here we wrote "indvPost" like this because we defined the arguments of PostCard as seen below */}
  //             {/* function PostCard({ $id, title, featuredImage })  */}
  //           </div>
  //         ))}
  //       </div>
  //     </Container>
  //   </div>
  // );

  // NOTE: I'm trying to bring the user's information at the home page.
  return (
    <div className=" flex flex-col w-screen h-full items-center ">
      <div className=" font-bold text-2xl">
        {/* <h1>User Name: {userData.name}</h1> */}
        <h1>{userData.name}'s Blogs</h1>
      </div>

      <div className="flex w-screen">
        {userPosts
          ? userPosts.map((indvPost) => (
              <div key={indvPost.$id} className="p-2 w-[200px]">
                <PostCard {...indvPost} />
                {/* Here we wrote "indvPost" like this because we defined the arguments of PostCard as seen below */}
                {/* function PostCard({ $id, title, featuredImage })  */}
              </div>
            ))
          : userData.map((indvPost) => (
              <div key={indvPost.$id} className="p-2 w-[200px]">
                <PostCard {...indvPost} />
                {/* Here we wrote "indvPost" like this because we defined the arguments of PostCard as seen below */}
                {/* function PostCard({ $id, title, featuredImage })  */}
              </div>
            ))}
      </div>
    </div>
  );
}

export default Home;
