import React from 'react'

const OutletHomePage3 = () => {
  return (
    <div>
           <div className="px-5 sm:px-10 md:px-20 lg:px-10 xl:px-20 py-8 bg-indigo-100" id="features">
            <div className="max-w-screen-xl mx-auto">
              <h3 className="leading-none font-black text-3xl">Features</h3>

              <div className="flex flex-col items-center flex-wrap lg:flex-row lg:items-stretch lg:flex-no-wrap lg:justify-between">
                <div className="w-full max-w-sm mt-6 lg:mt-8 bg-gray-100 rounded shadow-lg p-12 lg:p-8 lg:mx-4 xl:p-12">
                  <div className="p-4 inline-block bg-indigo-200 rounded-lg">
                    <svg
                      className="text-indigo-500 w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                      <line x1="9" y1="9" x2="9.01" y2="9" />
                      <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                  </div>
                  <div className="mt-4 text-2xl font-bold">High Quality</div>
                  <div className="mt-4 text-sm text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolores, quod quas ab harum.</div>
                </div>

                <div className="w-full max-w-sm mt-6 lg:mt-8 bg-gray-100 rounded shadow-lg p-12 lg:p-8 lg:mx-4 xl:p-12">
                  <div className="p-4 inline-block bg-indigo-200 rounded-lg">
                    <svg
                      className="text-indigo-500 w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                  </div>
                  <div className="mt-4 text-2xl font-bold">Fast Delivery</div>
                  <div className="mt-4 text-sm text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolores, quod quas ab harum.</div>
                </div>

                <div className="w-full max-w-sm mt-6 lg:mt-8 bg-gray-100 rounded shadow-lg p-12 lg:p-8 lg:mx-4 xl:p-12">
                  <div className="p-4 inline-block bg-indigo-200 rounded-lg">
                    <svg
                      className="text-indigo-500 w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                      <path d="M16 2v4M8 2v4M2 10h20" />
                    </svg>
                  </div>
                  <div className="mt-4 text-2xl font-bold">Affordable Price</div>
                  <div className="mt-4 text-sm text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolores, quod quas ab harum.</div>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default OutletHomePage3