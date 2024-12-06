import React, { useEffect, useState } from "react";
import postService from "../appwrite/PostService";
import {Button} from "../components";
import { useNavigate } from "react-router-dom";
const Blogs = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    const buttonref = React.useRef(null);

    const handleClick = () => {
        console.log('button clicked')
        navigate('../add-blog')

    }



    useEffect(() => {
        if(buttonref.current){
            buttonref.current.focus();
        }

      postService.getPosts().then((response) => {
        if (response.status) {
          setPosts(response.posts);
        }
        else{
          console.log('no posts')
        }
      });
    }, []);

  

  return (
    <>
    <div>
        blogs
    </div>
    <Button
    className = 'bg-green-600 py-1 px-2'
    ref={buttonref}
    children ='add blog post'
     buttonClick = {handleClick}

    />

    </>
  )
};

export default Blogs;
