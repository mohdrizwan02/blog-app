import React, { useState, useEffect } from "react";
import { Button } from "../components";
import postService from "../appwrite/PostService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddBlog = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogGenre, setBlogGenre] = useState("default");
  const [blogImage, setBlogImage] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [blogUrl, setBlogUrl] = useState();
  const [imageChange, setImageChange] = useState(false);

  const userId = useSelector((state) => state.auth.userData.$id);

  useEffect(() => {
    if (blogImage) {
      setBlogUrl((prev) => URL.createObjectURL(blogImage));
      setImageChange(true);
    }
  }, [blogImage]);

  const handleSubmit = async (e) => {

    
    setLoading((prev) => true);
    console.log(userId);

    e.preventDefault();
    

    const imageResponse = await postService.addImage(blogImage);
    if (imageResponse) {
      console.log("Image uploaded successfully", imageResponse);
      const imageId = imageResponse.$id;
      
      const postResponse = await postService.createPost({
        userid: userId,
        title: blogTitle,
        content: blogContent,
        imageid: imageId,
        bloggenre: blogGenre,
      });
      if (postResponse) {
        setLoading((prev) => false);
        navigate("/blogs");
      }
    }
  };

  return (
    <>
      {!loading ? (
        <div className="flex-col space-y-6">
          <div className="sm:mx-20 mx-10">
            <label
              htmlFor="blogTitle"
              className="block text-xl font-medium text-gray-700"
            >
              {" "}
              Blog Title{" "}
            </label>

            <input
              type="email"
              id="blogTitle"
              placeholder="blog title..."
              className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-lg"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
            />
          </div>
          <div className="sm:mx-20 mx-10">
            <label
              htmlFor="HeadlineAct"
              className="block text-xl font-medium text-gray-700"
            >
              {" "}
              Select your Blog Genre{" "}
            </label>

            <select
              name="blogGenre"
              id="blogGenre"
              className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-lg"
              value={blogGenre}
              onChange={(e) => setBlogGenre(e.target.value)}
            >
              <option value="">Please select</option>
              <option value="genre 1">genre 1</option>
              <option value="genre 2">genre 2</option>
              <option value="genre 3">genre 3</option>
              <option value="genre 4">genre 4</option>
            </select>
          </div>

          <div className="sm:mx-20 mx-10">
            <label
              htmlFor="blogContent"
              className="block text-xl font-medium text-gray-700"
            >
              {" "}
              Blog Content{" "}
            </label>

            <textarea
              id="blogContent"
              className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-lg"
              rows="4"
              value={blogContent}
              onChange={(e) => {
                setBlogContent(e.target.value);
              }}
              placeholder="Start writing about your blog..."
            ></textarea>
          </div>
          <div className="sm:mx-20 mx-10">
            <label
              htmlFor="blogContent"
              className="block text-xl font-medium text-gray-700"
            >
              {" "}
              Upload Image{" "}
            </label>
            <input
              type="file"
              className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-lg"
              onChange={(e) => setBlogImage((prev) => e.target.files[0])}
            />
            {imageChange && (
              <div>
                <img
                  src={blogUrl}
                  alt="blog image"
                  className="mt-4 mx-auto object-cover rounded-md"
                  width={"400px"}
                />
              </div>
            )}
          </div>

          <Button
            buttonClick={handleSubmit}
            className="flex mx-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            children="submit"
          />
        </div>
      ) : (
        <>
          <div className="mx-auto my-auto text-4xl">Loading......</div>
        </>
      )}
    </>
  );
};

export default AddBlog;
