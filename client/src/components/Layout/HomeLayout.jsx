import React from "react";
import { Outlet } from "react-router-dom";
//import TopNav from "../TopNav";
import SideNav from "../Navbars/SideNav";


const HomeLayout = ({ children }) => {
  return (
    <div>
      
      <SideNav  />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
