import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getHeroById,
  deleteHeroById,
  deleteHeroImage,
  updateHeroById,
} from "../../services/heroServices";
import { z } from "zod";

const heroSchema = z.object({
  nickname: z.string().min(2, "Nickname must be at least 2 characters"),
  real_name: z.string().min(2, "Real name must be at least 2 characters"),
  origin_description: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  superpowers: z.string().min(3, "Superpowers must be at least 3 characters"),
  catch_phrase: z.string().min(3, "Catch phrase must be at least 3 characters"),
  images: z.array(z.instanceof(File)).optional(),
});

function HeroInfo() {
  const { heroId } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    catch_phrase: "",
    superpowers: "",
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await getHeroById(heroId);
        setHero(response.data);
        setForm({
          nickname: response.data.nickname,
          real_name: response.data.real_name,
          origin_description: response.data.origin_description,
          catch_phrase: response.data.catch_phrase,
          superpowers: response.data.superpowers,
        });
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleUpdateHero = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = heroSchema.safeParse({ ...form, images });

    if (!result.success) {
      const fieldErrors = {};
      result.error?.issues?.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    setErrors({});

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      images.forEach((file) => formData.append("images", file));

      await updateHeroById(heroId, formData);

      const refreshed = await getHeroById(heroId);
      setHero(refreshed.data);

      setImages([]);
      setEditMode(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Failed to update hero:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!hero) return <p className="text-center text-white pt-20">Loading...</p>;

  return (
    <div className="pt-20 pb-10 min-h-screen bg-[#111827] text-white flex justify-center items-start px-6">
      <div
        className="max-w-5xl w-full bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col gap-8"
        style={{ boxShadow: "0 2px 10px 0 #1E3A8A" }}
      >
        {editMode ? (
          <form onSubmit={handleUpdateHero} className="flex flex-col gap-4">
            <input
              name="nickname"
              value={form.nickname}
              onChange={handleChange}
              placeholder="Nickname"
              className="p-2 rounded bg-gray-700 text-white"
            />
            {errors.nickname && (
              <p className="text-red-500">{errors.nickname}</p>
            )}

            <input
              name="real_name"
              value={form.real_name}
              onChange={handleChange}
              placeholder="Real Name"
              className="p-2 rounded bg-gray-700 text-white"
            />
            {errors.real_name && (
              <p className="text-red-500">{errors.real_name}</p>
            )}

            <textarea
              name="origin_description"
              value={form.origin_description}
              onChange={handleChange}
              placeholder="Origin Description"
              className="p-2 rounded bg-gray-700 text-white"
            />
            {errors.origin_description && (
              <p className="text-red-500">{errors.origin_description}</p>
            )}

            <input
              name="catch_phrase"
              value={form.catch_phrase}
              onChange={handleChange}
              placeholder="Catch Phrase"
              className="p-2 rounded bg-gray-700 text-white"
            />
            {errors.catch_phrase && (
              <p className="text-red-500">{errors.catch_phrase}</p>
            )}

            <input
              name="superpowers"
              value={form.superpowers}
              onChange={handleChange}
              placeholder="Superpowers"
              className="p-2 rounded bg-gray-700 text-white"
            />
            {errors.superpowers && (
              <p className="text-red-500">{errors.superpowers}</p>
            )}

            <div className="flex flex-wrap gap-4">
              {(hero.images ?? []).map((img, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={img}
                    alt={`Hero ${hero.nickname} ${index}`}
                    className="rounded-xl w-[150px] h-[220px] object-cover shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(img)}
                    className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <input
              id="file-upload"
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              📂 Add New Images
            </label>
            {errors.images && <p className="text-red-500">{errors.images}</p>}

            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-gray-700 px-2 py-1 rounded"
                  >
                    <p className="text-sm text-gray-300">{file.name}</p>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="text-red-400 hover:text-red-600"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition cursor-pointer"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center gap-6 md:w-1/3">
              {(hero.images ?? []).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Hero ${hero.nickname} ${index}`}
                  className="rounded-xl w-[224px] h-[340px] object-cover shadow-md"
                />
              ))}
            </div>

            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-bold text-blue-400">
                {hero.nickname}
              </h2>
              <h5 className="text-lg text-gray-300">
                Real name:{" "}
                <span className="font-semibold">{hero.real_name}</span>
              </h5>
              <p className="text-gray-400 leading-relaxed">
                <span className="font-semibold text-gray-200">Origin: </span>
                {hero.origin_description}
              </p>
              <p className="italic text-yellow-400">"{hero.catch_phrase}"</p>
              <p className="text-gray-300">
                <span className="font-semibold text-gray-200">
                  Superpowers:{" "}
                </span>
                {hero.superpowers}
              </p>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                >
                  Edit Hero
                </button>
                <button
                  onClick={handleDeleteHero}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer"
                >
                  Delete Hero
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroInfo;
