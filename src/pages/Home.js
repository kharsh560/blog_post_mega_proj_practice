import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../appwrite/config";
import { Container, PostCard } from "../components/index";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   service.getPosts().then((posts) => {
  //     if (posts) {
  //       setPosts(posts.documents);
  //       setIsLoading(true);
  //     }
  //   });
  // }, []);
  // setTimeout(() => {
  //   location.reload();
  // }, 100)
  // console.log(userData);

  // const userData = useSelector((state) => state.auth.userData);
  const userData = useSelector(state => state.auth.userData);
  useEffect(() => {
    if (userData) {
      console.log(userData);
    }
  }, [userData]);

  useEffect(() => {
    // Fetch posts when the component mounts
    const fetchPosts = async () => {
      try {
        const posts = await service.getPosts();
        if (posts) {
          setPosts(posts.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };
    // fetchPosts();
    // Check if userData is available before fetching posts
    if (userData) {
      fetchPosts();
    }
  }, [userData]);
  // Jab tak login hoga nahi user, tab tak toh userData aayega hee nahi na!

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
  // console.log(userData);
  if (userData) {
    userPosts = posts.filter((indvPost) => userData.$id === indvPost.userId);
  }
  // console.log(userPosts);
  // -> Gotcha :-)

  // if (isLoading) {
  //   //   18:02 min se:
  //   return (
  //     <div className="w-full py-8 mt-4 text-center">
  //       <Container>
  //         <div className="flex flex-wrap">
  //           <div className="p-2 w-full ">
  //             <h1 className="text-2xl font-bold hover:text-gray-500">
  //               Login to read posts
  //             </h1>
  //           </div>
  //         </div>
  //       </Container>
  //     </div>
  //   );
  // }

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
  if (userData) {
    return (
      <div className="bg-animated flex flex-col items-center min-h-screen ">
        <div className=" font-bold text-4xl p-4">
          {/* <h1>User Name: {userData.name}</h1> */}
          <h1 className="bg-gradient-to-r from-blue-800 via-black to-red-700 bg-clip-text text-transparent">
            {userData.name}'s Blogs
          </h1>
        </div>

        <div className="w-screen grid grid-cols-4 gap-4">
          {userData && userPosts.length > 0 ? (
            userPosts.map((indvPost) => (
              <div key={indvPost.$id} className="p-2 w-[300px]">
                <PostCard {...indvPost} />
                {/* Here we wrote "indvPost" like this because we defined the arguments of PostCard as seen below */}
                {/* function PostCard({ $id, title, featuredImage })  */}
              </div>
            ))
          ) : (
            <Container>
              <div className="flex flex-wrap">
                <div className="p-2 w-full ">
                  <h1 className="text-2xl font-bold hover:text-gray-500">
                    Posts Loading...
                  </h1>
                </div>
              </div>
            </Container>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-animated h-[65vh] flex justify-center items-center">
        <div className="bg-gray-100 bg-opacity-50  backdrop-blur-md p-4 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
          <h1 className="w-fit text-center text-4xl font-bold bg-gradient-to-r from-blue-800 via-purple-600 to-red-900 bg-clip-text text-transparent">
            Welcome to a World of Words: Your Thoughts, Your Stories, Your Blog!
          </h1>
          <h2 className="text-center text-2xl font-bold text-pink-500">
            Please Log in to read blogs!
          </h2>
        </div>
      </div>
    );
  }
}

export default Home;

// userPosts.map((indvPost) => (
//                   <div key={indvPost.$id} className="p-2 w-[200px]">
//                     <PostCard {...indvPost} />
//                     {/* Here we wrote "indvPost" like this because we defined the arguments of PostCard as seen below */}
//                     {/* function PostCard({ $id, title, featuredImage })  */}
//                   </div>
//                 ))
