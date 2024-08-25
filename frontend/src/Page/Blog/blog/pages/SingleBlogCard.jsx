import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { jobBlogPosts } from "../../../../store/blogData";


const SingleBlogCard = () => {
  const { id } = useParams();
  const post = jobBlogPosts.find((post) => post.id === parseInt(id));
  const [showFullContent, setShowFullContent] = useState(false);

  if (!post) {
    return <div>Post not found</div>;
  }

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    // <section className="max-w-5xl mx-auto py-10">
    //   <div className="container mx-auto px-4">
    //     <div className="flex flex-col justify-center items-center pt-14 pb-11">
    //       <div className="w-full max-w-3xl p-6">
    //         <div className="mb-6">
    //           <div className="text-gray-600 mb-4">
    //             <span className="font-semibold">Blog</span> {post.date}
    //           </div>
    //           <h1 className="text-5xl text-black text-center mb-6">
    //             {post.title}
    //           </h1>
    //         </div>
    //         <div className="flex justify-center mb-6">
    //           <img
    //             src={post.imgSrc}
    //             className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
    //             alt={post.altText}
    //           />
    //         </div>
    //         <div className="max-w-3xl text-gray-700 mt-8">
    //           <p className="mb-4">
    //             {showFullContent ? post.description : `${post.description.slice(0, 200)}...`}
    //           </p>
    //           <button
    //             className="text-blue-500 hover:underline"
    //             onClick={toggleContent}
    //           >
    //             {showFullContent ? "Show Less" : "Read More"}
    //           </button>
    //         </div>
    //       </div>
    //       <Link className="text-2xl" to="/blogs">
    //         Read More Blogs!
    //       </Link>
    //       <div className="mt-4">
    //         Tags: <span className="underline cursor-pointer">Content, blogs</span>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="max-w-5xl mx-auto py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-center items-center pt-14 pb-11">
          <div className=" w-full max-w-4xl p-6">
            <div className="mb-6">
              <div className="text-gray-600 mb-4">
                <span className="font-semibold">Blog</span> {/* Date */}
                <span>{post.date}</span>
              </div>
              {/* Title */}
              <h1 className="text-5xl text-black mb-6">{post.title}</h1>
            </div>
            <div className="flex justify-center mb-6">
              {/* Img */}
              <img
                src={post.imgSrc}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
                alt="Blog Illustration"
              />
            </div>

            {/* Description */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {post.description}
            </h2>
          </div>

          {/* Content */}
          <div className="max-w-3xl text-gray-700 mt-8 p-">
            <p className="mb-4">
              <span className="text-lg font-bold">
                {post.content.heading1.heading}
              </span>
              <br />
              {post.content.heading1.content}
            </p>
            <p className="mb-4">
              <span className="text-lg font-bold">
                {post.content.heading2.heading}
              </span>
              <br />
              {post.content.heading2.content}
            </p>
            <p className="mb-4">
              <span className="text-lg font-bold">
                {post.content.heading3.heading}
              </span>
              <br />
              {post.content.heading3.content}
            </p>

            <p className="mb-4">
              <span className="text-lg font-bold">
                {post.content.heading4.heading}
              </span>
              <br />
              {post.content.heading4.content}
            </p>
            <p className="mb-4">
              <span className="text-lg font-bold">
                {post.content.heading5.heading}
              </span>
              <br />
              {post.content.heading5.content}
            </p>
            <p className="mb-4">
              <span className="text-lg font-bold">
                {post.content.heading6.heading}
              </span>
              <br />
              {post.content.heading6.content}
            </p>
            <p className="mb-4">
              <span className="text-lg font-bold">
                {post.content.heading7.heading}
              </span>
              <br />
              {post.content.heading7.content}
            </p>
          </div>
        </div>
        <Link className="text-2xl">Read More Blogs !</Link>
        <div>
          Tags: <span className="underline cursor-pointer">Content,blogs</span>
        </div>
      </div>
    </section>
  );
};

export default SingleBlogCard;
