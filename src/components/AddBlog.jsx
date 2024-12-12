import React from "react";

const AddBlog = () => {
  return (
    <>
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
            className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-lg"
          />
        </div>
        <div className='sm:mx-20 mx-10'>
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
            className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-lg"
          >
            <option value="">Please select</option>
           
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
            className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-lg"
            rows="4"
            placeholder="Start writing about your blog..."
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
