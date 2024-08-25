import React from "react";

import { Outlet } from "react-router-dom";
import UserDashboardContainer from "./outlet/UserDasbboardContainer";
import SearchBar from "./outlet/SearchMenu";
import JobCardSingle from "./outlet/card/singlePage/SingleJobCard";

const UserDashboard = () => {
  return (
    <>
      <div className="border border-black">
    
        <main className="  ">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default UserDashboard;
