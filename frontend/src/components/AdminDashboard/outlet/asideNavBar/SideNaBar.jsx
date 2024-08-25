import React, { useEffect } from "react";
import { FaFolder } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import LaptopResponsive from './LaptopReponsive/LaptopResponsive'
import {MobileResponsive} from './mobileRsponive/MobileResponsive'
import axios from "axios";
import { useAuth } from "../../../../contexApi/authContext";
const SideNaBar = ({ panel, setPanel }) => {

  
  return (
    <>
      {/* // laptop */}
      <LaptopResponsive  />

      {/* // mobile */}
    <MobileResponsive panel = {panel} setPanel = {setPanel}/>
    </>
  );
};

export default SideNaBar;
