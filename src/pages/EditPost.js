import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Container, Postform } from "../components/index";

function EditPost() {
  const [post, setPost] = useState([]);
  // When user will click the "edit post" then from the URL we need to fetch the "slug"
  // And to extract any value from URL we can use "useParams()" from react router dom.
  const { slug } = useParams();
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

  return post ? (
    <div className="py-8">
      <Container>
        <Postform post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
