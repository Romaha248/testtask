import React, { useState, useEffect } from "react";
import { getAllHeroes } from "../../services/heroServices";
import HeroCard from "./HeroCard/HeroCard";
import { useSearchParams } from "react-router-dom";
import Page from "../Pagination/Page";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;

  const [page, setPage] = useState(initialPage);
  const [heroes, setHeroes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getAllHeroes(page).then((response) => {
      setHeroes(response.data.heroes);
      setTotalPages(response.data.totalPages);

      setSearchParams({ page });

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [page, setSearchParams]);

  return (
    <div className="pt-20 flex items-center justify-center flex-col bg-[#111827]">
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
          {heroes.map((hero) => (
            <HeroCard hero={hero} />
          ))}
        </div>
      </div>
      <div className="flex gap-4 my-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <Page key={i + 1} pageNum={i + 1} setPage={setPage} currPage={page} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
