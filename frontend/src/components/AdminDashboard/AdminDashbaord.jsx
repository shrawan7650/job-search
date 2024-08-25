import React, { useState } from "react";
import SideNaBar from "./outlet/asideNavBar/SideNaBar";
import RightPartDashboard from "./outlet/rightPartDashboard/RightPartDashboard";
import { Outlet } from "react-router-dom";
import { RightSideBarHeader } from "./outlet/dashboardNavbar/rightSideBarHeader";

const AdminDashboard = () => {
  const [panel, setPanel] = useState(false);
  console.log("panel",panel)

  return (
    <> 
    
      <div className="flex bg-gray-100   dark:bg-gray-800 text-gray-700 dark:text-gray-300 min-h-screen">
    
        <SideNaBar panel={panel} setPanel={setPanel}  />
        <div className="w-full">
     
          <RightSideBarHeader panel={panel} setPanel={setPanel} />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
