import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Postform } from "../components/index";

function EditPost() {
  const [post, setPost] = useState([]);
  // When user will click the "edit post" then from the URL we need to fetch the "slug"
  // And to extract any value from URL we can use "useParams()" from react router dom.
  // useParams is a hook provided by react-router-dom that allows you to access the parameters of the current route. This is particularly useful for dynamic routing, where parts of the URL are used as variables. Here’s how it works and how you can use it in your React application.

  const { slug } = useParams();
  // console.log(slug);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [navigate, slug]);
  console.log("Here is the: ", post);
  return post ? (
    <div>
      <Postform post={post} />
    </div>
  ) : null;
}

export default EditPost;
