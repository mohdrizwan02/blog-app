import React, { useEffect, useState } from "react";
import postService from "../appwrite/PostService";
const Blog = ({ blogId }) => {
  const [post, setPost] = useState();
  const [imageUrl, setImageUrl] = useState();
  console.log(blogId);

  useEffect(() => {
    postService
      .getPost(blogId)
      .then((response) => {
        console.log(response);
        setPost(response);
        return response.blogimage;
      })
      .then((response) => {
        setImageUrl(postService.getImageUrl(response));
      });
  }, []);
  return (
    <>
      {post && (
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="space-y-4 md:space-y-8">
              <img src={imageUrl} className="rounded mx-auto max-h-96" alt="" />
              <div className="max-w-xl">
                <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                  {post.title}
                </h2>

                <p className="mt-4 text-gray-700">{post.content}</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Blog;
