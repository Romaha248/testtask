import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHeroById } from "../../services/heroServices";

function HeroInfo() {
  const { heroId } = useParams();
  const [hero, setHero] = useState(null);

  useEffect(() => {
    getHeroById(heroId).then((response) => {
      setHero(response.data);
    });
  }, [heroId]);

  if (!hero) return <p className="text-center text-white pt-20">Loading...</p>;

  return (
    <div className="pt-20 min-h-screen bg-[#111827] text-white flex justify-center items-start px-6">
      <div className="max-w-5xl w-full bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
        {/* Left side: Images */}
        <div className="flex flex-col items-center gap-4 md:w-1/3">
          {hero.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Hero ${hero.nickname} ${index}`}
              className="rounded-xl w-[224px] h-[340px] object-cover shadow-md"
            />
          ))}
        </div>

        {/* Right side: Info */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-blue-400">{hero.nickname}</h2>
          <h5 className="text-lg text-gray-300">
            Real name: <span className="font-semibold">{hero.real_name}</span>
          </h5>
          <p className="text-gray-400 leading-relaxed">
            <span className="font-semibold text-gray-200">Origin: </span>
            {hero.origin_description}
          </p>
          <p className="italic text-yellow-400">"{hero.catch_phrase}"</p>
          <p className="text-gray-300">
            <span className="font-semibold text-gray-200">Superpowers: </span>
            {hero.superpowers}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeroInfo;
