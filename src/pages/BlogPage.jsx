import React from 'react'
import { useParams } from 'react-router-dom'

export const BlogPage = () => {
    const {blogId} = useParams()
  return (
    <>
    <div>BlogPage</div>
    {blogId}
    </>
  )
}

