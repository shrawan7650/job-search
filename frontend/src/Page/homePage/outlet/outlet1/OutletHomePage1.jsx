import React, { useState } from "react";
import Layout from "../../../../components/Layout/Layout";

const OutletHomePage1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1524749292158-7540c2494485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=85",
    "https://images.unsplash.com/photo-1556742400-b5b7c512f1f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1522202221773-4fd884d92465?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=85",
  ];

  const testimonials = [
    {
      image: "https://images.unsplash.com/photo-1524749292158-7540c2494485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=85",
      quote: "This platform has revolutionized our hiring process. The designers we found here were top-notch!",
      author: "John Doe, HR Manager",
    },
    {
      image: "https://images.unsplash.com/photo-1556742400-b5b7c512f1f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      quote: "The user interface is intuitive and the customer support is outstanding. Highly recommend!",
      author: "Jane Smith, CEO",
    },
    {
      image: "https://images.unsplash.com/photo-1522202221773-4fd884d92465?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=85",
      quote: "We've been able to find the best talents quickly. The search filters are precise and effective.",
      author: "Mike Johnson, CTO",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
  
      <div className="flex flex-col items-center justify-center py-10 bg-gray-100">
        {/* Unique Content for Admin Panel Home Page */}
        <div className="w-full px-5 sm:px-10 md:px-20 lg:max-w-4xl">
          <h1 className="text-4xl font-extrabold text-center mb-6">Welcome to Your Admin Dashboard</h1>
          <p className="text-center text-lg mb-10">
            Manage your job postings, track applicants, and find the best talent faster with our powerful tools.
          </p>
        </div>

        {/* Image Slider Section */}
        <div className="relative w-full max-w-2xl mb-10">
          <div className="overflow-hidden relative w-full h-64 rounded-lg shadow-lg">
            <img
              src={images[currentIndex]}
              alt="Slider Image"
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-blue-500 text-white p-2 rounded-full focus:outline-none"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-blue-500 text-white p-2 rounded-full focus:outline-none"
          >
            &#10095;
          </button>
               {/* Circles Indicator */}
               <div className="flex justify-center mt-4">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 mx-1 rounded-full ${
                  index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="relative w-full max-w-2xl">
          <h1 className=" text-center uppercase mb-5 text-2xl font-medium">testimonials</h1>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <img
              src={testimonials[currentTestimonialIndex].image}
              alt={`Testimonial ${currentTestimonialIndex + 1}`}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 text-lg italic">
              "{testimonials[currentTestimonialIndex].quote}"
            </p>
            <p className="mt-2 text-gray-500 text-sm text-right">
              - {testimonials[currentTestimonialIndex].author}
            </p>
          </div>

          {/* Testimonial Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-blue-500 text-white p-2 rounded-full focus:outline-none"
          >
            &#10094;
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-blue-500 text-white p-2 rounded-full focus:outline-none"
          >
            &#10095;
          </button>

          {/* Circles Indicator */}
          <div className="flex justify-center mt-4">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 mx-1 rounded-full ${
                  index === currentTestimonialIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
  
  );
};

export default OutletHomePage1;
