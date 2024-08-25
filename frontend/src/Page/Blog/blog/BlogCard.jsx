import React from "react";
import { Link } from "react-router-dom";
import { jobBlogPosts } from "../../../store/blogData";
 

const BlogList = () => {
  return (
    <div id="blog" className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {jobBlogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              alt={post.altText}
              src={post.imgSrc}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <span className="text-gray-500">Blog . {post.date}</span>
              <h2 className="font-bold text-lg mt-2">{post.title}</h2>
              <p className="text-gray-700 mt-2">{post.description.slice(0, 100)}...</p>
              <Link
                to={`/blog/${post.id}`}
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
