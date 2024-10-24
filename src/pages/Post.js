import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  // This "post" is being populated using useEffect hook.
  const { slug } = useParams();
  console.log(slug); // Yes, its logging "slug" properly
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  // 20:35 min (L26)
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  // NOOTE:-> As a bug, its showing issue. Even though kh1234@gmail.com user is the owner, the edit and delete buttons aren't showing up.
  // console.log(`post.userId: ${post.$id} And ${userData.$id} `);
  // NOTE: Its happening so that, sometimes its showing, and sometimes not!

  useEffect(() => {
    if (slug) {
      // We are getting "slug" from useParams()
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else {
          console.log(
            `value of clicked card's slug: ${slug} and post is ${post}`
          );
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  console.log(post); // NOTE: Its logging "null" -> But after a fraction of second, its not logging null!!!

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };
  
  return post ? (
    <div className="py-8 bg-animated min-h-screen flex justify-center">
      <div className="bg-gray-100 bg-opacity-50 rounded-xl p-4 backdrop-blur-md w-3/4">
        <div className="w-full flex justify-center mb-4 relative  p-2">
          <img
            src={service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl w-[500px]"
          />

          {isAuthor && (
            <div className="absolute right-6 flex flex-col items-center gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </div>
    </div>
  ) : null;
}
