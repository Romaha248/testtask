import React from "react";
import { Link } from "react-router-dom";

function HeroCard({ hero }) {
  return (
    <div
      key={hero._id}
      className="w-64 p-4 m-4 bg-gray-800 rounded-2xl shadow-lg"
      style={{ boxShadow: "0 4px 12px 0 #1E3A8A" }}
    >
      <img
        src={hero.images[0]}
        alt="Hero Image"
        className="rounded-4xl pb-3 w-[224px] h-[340px]"
      />
      <h3 className="flex items-center justify-center text-lg font-bold text-[#F3F4F6]">
        {hero.nickname}
      </h3>
      <div className="flex items-center justify-center">
        <Link
          to={`/${hero._id}`}
          className="flex items-center justify-center w-20 h-8 rounded-2xl 
             bg-blue-700 hover:bg-blue-800 
             text-white font-medium transition-colors"
        >
          Details
        </Link>
      </div>
    </div>
  );
}

export default HeroCard;
