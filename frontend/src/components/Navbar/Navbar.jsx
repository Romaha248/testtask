import React from "react";
import logo from "../../assets/superman-logo.png";
import addHero from "../../assets/new-hero.png";
import IconLink from "./IconLink";

function Navbar() {
  return (
    <nav className="bg-[#1E3A8A] py-2 px-4 flex items-center justify-between fixed w-full z-10">
      <div className="flex items-center">
        {/* <img src={logo} className="w-6 h-6 rounded-2xl mr-2.5" /> */}
        <h1 className="text-2xl text-white">HeroBoard</h1>
      </div>
      <div className="flex items-center">
        <IconLink title="HEROES" icon={logo} link="/" />
        <IconLink title="ADD HERO" icon={addHero} link="/add-hero" />
      </div>
    </nav>
  );
}

export default Navbar;
