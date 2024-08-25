import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import OutletHomePage1 from "./outlet/outlet1/OutletHomePage1";
import OutletHomePage2 from "./outlet/outlet2/OutletHomePage2";
import OutletHomePage3 from "./outlet/outlet3/OutletHomePage3";
import OutletHomePage4 from "./outlet/outlet4/OutletHomePage4";
import OutletHomePage5 from "./outlet/outlet5/OutletHomePage5";
import BlogList from "../Blog/blog/BlogCard";
const HomePage = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="py-2 bg-gray-100 text-gray-900 min-h-screen">
      <Header />

      <main style={{ minHeight: "90vh" }}>
        <div id="hero" className="pt-5 lg:flex items-center">
          <div className="px-5 sm:px-10 md:px-10 md:flex lg:block lg:w-1/2 lg:max-w-3xl lg:mr-8 lg:px-20">
            <div className="md:w-1/2 md:mr-10 lg:w-full lg:mr-0">
              <h1 className="text-3xl xl:text-4xl font-black md:leading-none xl:leading-tight">
                Hire a Designer Near You
              </h1>
              <p className="mt-4 xl:mt-2">
                World Class Designers, just for you on contract, full-time or
                part-time, whatever you need.
              </p>
            </div>
            <div className="flex-1">
              <div className="relative mt-4 md:mt-0 lg:mt-4">
                <div className="pl-4 pr-4 h-full absolute bottom-0 left-0 flex items-center">
                  <svg
                    className="text-gray-700 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx={11} cy={11} r={8} />
                    <line x1={21} y1={21} x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full border bg-gray-100 px-4 py-4 text-sm tracking-wide focus:outline-none focus:shadow-outline rounded pl-12"
                  placeholder="Type (e.g junior, senior)"
                />
              </div>
              <div className="relative mt-4">
                <div className="pl-4 pr-4 h-full absolute bottom-0 left-0 flex items-center">
                  <svg
                    className="text-gray-700 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx={12} cy={10} r={3} />
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full border bg-gray-100 px-4 py-4 text-sm tracking-wide focus:outline-none focus:shadow-outline rounded pl-12"
                  placeholder="Mountain View, California"
                />
              </div>
              <div>
                <button className="transition-all duration-300 mt-5 w-full border border-transparent rounded font-semibold tracking-wide text-sm px-5 py-4 focus:outline-none focus:shadow-outline bg-indigo-500 text-gray-100 hover:bg-indigo-600 hover:text-gray-200">
                  Find Designers
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 w-full flex-1 lg:mt-0">
            <div />
            <img
              className
              src="https://images.unsplash.com/photo-1524749292158-7540c2494485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=85"
            />
          </div>
        </div>

        <OutletHomePage2 />
        <OutletHomePage3 />
        <OutletHomePage4 />
        <BlogList />

        <OutletHomePage1 />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
