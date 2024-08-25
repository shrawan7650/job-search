import React from "react";
import Card from "./Cards";

const JobsCardsUserSide = ({ jobs, loading }) => {
  if (loading)
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="border-4 rounded-full animate-spin flex justify-center border-l-slate-500 w-24 h-24"></div>
    </div>
  );
  


  return (
    <div className="container mx-auto aspect-auto  flex flex-wrap p-4">
      {jobs?.map((job, index) => (
        <Card key={index} job={job} />
      ))}
    </div>
  );
};

export default JobsCardsUserSide;
