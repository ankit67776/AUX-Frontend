"use client";

import { useState } from "react";

export default function CreateAd() {
  const [adData, setAdData] = useState({
    name: "",
    media: null,
    target_url: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAdData((prev) => ({ ...prev, media: file }));

    // Show image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("ad_unit[name]", adData.name);
    formData.append("ad_unit[media]", adData.media);
    formData.append("ad_unit[target_url]", adData.target_url);

    try {
      const response = await fetch("http://127.0.0.1:3000/ad_units", {

        method: "POST",

        body: formData,
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNzQyMTc2MTUxLCJleHAiOjE3NDIyNjI1NTEsImp0aSI6IjQzNTc5MWQ0LTAxYjUtNDEzNi05ZjFkLTljZjY1OTlhYjY0OSJ9.Hf3pEGOqe-S_tX821QPjzUXOsmX48rS33Kl1wDuORlc"
        }
      });

      if (!response.ok) throw new Error("Failed to create ad");

      alert("Ad Created Successfully!");
      setAdData({ name: "", media: null, target_url: "" });
      setPreview(null);
    } catch (error) {
      console.error(error);
      alert("Error creating ad");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Ad</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Ad Title</label>
          <input
            type="text"
            name="name"
            value={adData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Ad Format</label>
          <select
            name="ad_type"
            value={adData.ad_type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="Standard">Standard</option>
            <option value="Rich Media">Rich Media</option>
            <option value="Video">Video</option>
            <option value="Audio">Audio</option>
            <option value="CTV">CTV</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Upload Media</label>
          <input
            type="file"
            accept="image/*,video/*,audio/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Ad Preview" className="w-full h-40 object-cover rounded-lg" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Target URL</label>
          <input
            type="url"
            name="target_url"
            value={adData.target_url}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Ad
        </button>
      </form>
    </div>
  );
}
