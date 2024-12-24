import React from "react";
import postService from "../appwrite/PostService";
import { useSelector } from "react-redux";
import { Button } from "../components";

const MyBlogs = () => {
  const buttonref = React.useRef(null);
  const [posts, setPosts] = React.useState();
  const userid = useSelector((state) => state.auth.userData.$id);
  const handleClick = () => {
    console.log("button clicked");
    navigate("../add-blog");
  };
  React.useEffect(() => {
    if (buttonref.current) {
      buttonref.current.focus();
    }
    
    postService.getUserPosts(userid).then((response) => {
      if (response) {
        setPosts(response.documents);
        
      } else {
        console.log("no posts");
      }
    });
  }, []);
  return (
    <>
      <div>
        <section className="bg-white ">
          <div className="container px-6 py-10 mx-auto">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl ">
                Your Blogs
              </h1>
              <Button
                className="bg-green-600 py-1 px-2"
                ref={buttonref}
                children="add new blog post"
                buttonClick={handleClick}
              />
            </div>

            <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
              {posts &&
                posts.map((post) => (
                  <div
                    className="border-2 p-4 flex-col justify-items-center justify-center border-gray-400 rounded-lg"
                    key={post.$id}
                  >
                    <div className="lg:flex ">
                      <img
                        className="object-cover w-full h-56 rounded-lg lg:w-64"
                        src={postService.getImageUrl(post.blogimage)}
                        alt=""
                      />

                      <div className="flex flex-col justify-between mt-4 lg:mx-6">
                        <div>
                          <p className="text-xl font-semibold text-gray-800  ">
                            {post.title}
                          </p>
                          <p className="my-3">{post.content}</p>
                        </div>
                        <span className="text-sm text-gray-500 ">
                          {post.blogdate}
                        </span>
                      </div>
                    </div>
                    <button
                      className="my-2 py-1 px-2  bg-blue-700 rounded-md hover:bg-green-500"
                      onClick={() => navigate(`/blogs/${post.$id}`)}
                    >
                      view blog
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MyBlogs;
