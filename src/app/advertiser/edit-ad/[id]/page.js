"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditAd({ params }) {
  const router = useRouter();
  const { id } = params; // Get ad ID from the URL
  const [adData, setAdData] = useState({
    title: "",
    adFormat: "Standard",
    media: null,
    targetUrl: "",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch ad details
  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await fetch(`/api/ads/${id}`);
        if (!response.ok) throw new Error("Failed to fetch ad");

        const data = await response.json();
        setAdData({
          title: data.title,
          adFormat: data.adFormat,
          media: data.media,
          targetUrl: data.targetUrl,
        });
        setPreview(data.media);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ad:", error);
        setLoading(false);
      }
    };

    if (id) fetchAd();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle media upload preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAdData((prev) => ({ ...prev, media: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission (Update Ad)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", adData.title);
    formData.append("adFormat", adData.adFormat);
    formData.append("media", adData.media);
    formData.append("targetUrl", adData.targetUrl);

    try {
      const response = await fetch(`/api/ads/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update ad");

      alert("Ad Updated Successfully!");
      router.push("/advertiser/ads"); // Redirect to Manage Ads page
    } catch (error) {
      console.error(error);
      alert("Error updating ad");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Ad</h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Ad Title</label>
            <input
              type="text"
              name="title"
              value={adData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Ad Format</label>
            <select
              name="adFormat"
              value={adData.adFormat}
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
            <label className="block text-gray-700">Upload New Media</label>
            <input
              type="file"
              accept="image/*,video/*,audio/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
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
              name="targetUrl"
              value={adData.targetUrl}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Update Ad
          </button>
        </form>
      )}
    </div>
  );
}
