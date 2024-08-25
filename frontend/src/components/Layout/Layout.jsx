// App.jsx or Layout.jsx
import React from "react";
import SearchBar from "../UserDasboard/outlet/SearchMenu";
import Footer from "../Footer/Footer"
const Layout = ({ children }) => {
  return (
    <div>
      <SearchBar/>
      <main className="min-h-[30rem]">{children}</main>
    <Footer/>
    </div>
  );
};

export default Layout;
