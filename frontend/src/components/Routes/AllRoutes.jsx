import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import AddHero from "../AddHero/AddHero";
import HeroInfo from "../HeroInfo/HeroInfo";

function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-hero" element={<AddHero />} />
        <Route path="/:heroId" element={<HeroInfo />} />
      </Routes>
    </>
  );
}

export default AllRoutes;
