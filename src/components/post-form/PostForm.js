import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import service from "../../appwrite/config";
import { Button, Input, Select, RTE } from "../index"

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  // const userData = useSelector(state => state.user.userData); + Mistakenly, sir wrote "user.userData" +
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    // NOTE: This "data" ofcourse would be an object and it conatins stuffs from the RTE and image.
    // Also NOTE:- 29 min (L25) -> It won't be having the user related data for sure, so need to provide that additionally.
    if (post) {
      const file = data.image[0] ? service.uploadFile(data.image[0]) : null;
      // We have just Uploaded the new image file.
      // But, we also do need to delete the old post's image.
      if (file) {
        service.deleteFile(post.featuredImage);
        // In appwrite, while defining attributes, we named it as "featuredImage" so!
        // We are deleting the "image aka featuredImage" stored in appwrite.
      }
      // 22:50 (L25) Now we need to update the post too!
      // Noote :- "dbPost is just a variable name, could name it anything!"
      const dbPost = await service.updatePost({
        slug: post.$id,
        featuredImage: file ? file.id : undefined,
        ...data,
      });
      // 24:34 (L25) If you got "dbPost" then user ko navigate v kara do.
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // 25:38->26:35 (L25) -> Now, if we don't have post, then?
      // Then, first of all do the file upload only, and then just "createPost"
      const file = await service.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        // Note: Here, everythong is "$id" as like in mongoDB, everything is "_id"
        data.featuredImage = fileId;
        // NOTE: Q) See line no. 26 :- There, its "data.image" but here in line 53, its "data.featuredImage".....How?

        // 28:43 -> Now, let's send rest of the properties of "data" using create post.
        // Noote:- 29 min (L25): We can't write data simply as (data), else we need to spread it, bcoz we
        // also need to pass in "userInfo", which we don't get through "data"
        const dbPost = await service.createPost({
          userId: userData.$id, // 29:29 min (L25)
          ...data,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  // 31:05 L(25) -> VVI for interviews -> 36:20 = Not this, but how to use this is the interview Question.
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);
  // In React, the useCallback hook is used to memoize callback functions.
  // It returns a memoized version of the callback that only changes if one of the
  // dependencies has changed. This can help prevent unnecessary re-renders and optimize performance,
  // especially in cases where the callback is passed as a prop to child components that rely on reference
  // equality to determine if they should update.

  // 36:20 :- Interview Ques;
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  // 40:38 (L25)
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
