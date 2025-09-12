import React from "react";
import { NavLink } from "react-router-dom";

const IconLink = ({ title, icon, link }) => {
  return (
    <NavLink to={link}>
      <h4 className="flex items-center pr-10 text-2xl text-white">
        {title}
        <img src={icon} className="center h-8 w-8 object-contain ml-1" />
      </h4>
    </NavLink>
  );
};

export default IconLink;
