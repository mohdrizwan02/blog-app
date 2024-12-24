import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {Blog} from '../components'

export const BlogPage = () => {
  const { blogId } = useParams();
  
  return (
    <Blog blogId={blogId} />
  );
};
