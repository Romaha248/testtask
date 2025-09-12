import { useState } from "react";
import { createHero } from "../../services/heroServices";
import { z } from "zod";

const heroSchema = z.object({
  nickname: z.string().min(2, "Nickname must be at least 2 characters"),
  real_name: z.string().min(2, "Real name must be at least 2 characters"),
  origin_description: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  superpowers: z.string().min(3, "Superpowers must be at least 3 characters"),
  catch_phrase: z.string().min(3, "Catch phrase must be at least 3 characters"),
  images: z
    .array(z.instanceof(File))
    .min(1, "Please upload at least one image"),
});

function CreateHero() {
  const [form, setForm] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    catch_phrase: "",
    superpowers: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleSubmit = async (e) => {
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
      const response = await createHero(form, images);
      console.log("Hero created:", response.data);

      setForm({
        nickname: "",
        real_name: "",
        origin_description: "",
        catch_phrase: "",
        superpowers: "",
      });
      setImages([]);
    } catch (err) {
      if (err.response) {
        console.error("Failed to create hero:", err.response.data);
      } else {
        console.error("Failed to create hero:", err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-13 bg-[#111827]">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-lg 
          h-[500px]
          overflow-y-auto
          p-6 bg-gray-800 rounded-2xl shadow-lg 
          flex flex-col gap-4
        "
      >
        <h2 className="text-white text-2xl font-bold text-center">
          Create Hero
        </h2>

        <div>
          <input
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
            placeholder="Nickname"
            className="p-2 rounded bg-gray-700 text-white w-full"
          />
          {errors.nickname && (
            <p className="text-red-400 text-sm">{errors.nickname}</p>
          )}
        </div>

        <div>
          <input
            name="real_name"
            value={form.real_name}
            onChange={handleChange}
            placeholder="Real Name"
            className="p-2 rounded bg-gray-700 text-white w-full"
          />
          {errors.real_name && (
            <p className="text-red-400 text-sm">{errors.real_name}</p>
          )}
        </div>

        <div>
          <textarea
            name="origin_description"
            value={form.origin_description}
            onChange={handleChange}
            placeholder="Origin Description"
            className="p-2 rounded bg-gray-700 text-white w-full"
          />
          {errors.origin_description && (
            <p className="text-red-400 text-sm">{errors.origin_description}</p>
          )}
        </div>

        <div>
          <input
            name="catch_phrase"
            value={form.catch_phrase}
            onChange={handleChange}
            placeholder="Catch Phrase"
            className="p-2 rounded bg-gray-700 text-white w-full"
          />
          {errors.catch_phrase && (
            <p className="text-red-400 text-sm">{errors.catch_phrase}</p>
          )}
        </div>

        <div>
          <input
            name="superpowers"
            value={form.superpowers}
            onChange={handleChange}
            placeholder="Superpowers"
            className="p-2 rounded bg-gray-700 text-white w-full"
          />
          {errors.superpowers && (
            <p className="text-red-400 text-sm">{errors.superpowers}</p>
          )}
        </div>

        <div>
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
            📂 Choose Files
          </label>
          {errors.images && (
            <p className="text-red-400 text-sm">{errors.images}</p>
          )}
        </div>

        {images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((img, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-gray-700 px-2 py-1 rounded"
              >
                <p className="text-sm text-gray-300">{img.name}</p>
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
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Hero"}
        </button>
      </form>
    </div>
  );
}

export default CreateHero;
