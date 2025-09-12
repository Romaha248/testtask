import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getHeroById,
  deleteHeroById,
  deleteHeroImage,
} from "../../services/heroServices";

function HeroInfo() {
  const { heroId } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await getHeroById(heroId);
        setHero(response.data);
      } catch (err) {
        console.error("Failed to fetch hero:", err);
      }
    };

    fetchHero();
  }, [heroId]);

  const handleDeleteHero = async () => {
    if (!window.confirm("Are you sure you want to delete this hero?")) return;

    try {
      await deleteHeroById(heroId);
      navigate("/");
    } catch (err) {
      console.error("Failed to delete hero:", err);
    }
  };

  const handleDeleteImage = async (imageUrl) => {
    if (hero.images.length <= 1) {
      alert("A hero must have at least one image.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await deleteHeroImage(heroId, imageUrl);
      setHero((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img !== imageUrl),
      }));
    } catch (err) {
      console.error("Failed to delete image:", err);
    }
  };

  if (!hero) return <p className="text-center text-white pt-20">Loading...</p>;

  return (
    <div className="pt-20 pb-10 min-h-screen bg-[#111827] text-white flex justify-center items-start px-6">
      <div
        className="max-w-5xl w-full bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8"
        style={{ boxShadow: "0 2px 10px 0 #1E3A8A" }}
      >
        <div className="flex flex-col items-center gap-6 md:w-1/3">
          {hero.images.map((img, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={img}
                alt={`Hero ${hero.nickname} ${index}`}
                className="rounded-xl w-[224px] h-[340px] object-cover shadow-md"
              />
              <button
                onClick={() => handleDeleteImage(img)}
                className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm transition cursor-pointer"
              >
                Delete Image
              </button>
            </div>
          ))}
        </div>

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

          <button
            onClick={handleDeleteHero}
            className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer"
          >
            Delete Hero
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroInfo;
