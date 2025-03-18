"use client";

import { useState, useEffect } from "react";

export default function ManageAds() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      const response = await fetch("http://localhost:3000/ad_units", {
        method: "GET",

        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNzQyMTc2MTUxLCJleHAiOjE3NDIyNjI1NTEsImp0aSI6IjQzNTc5MWQ0LTAxYjUtNDEzNi05ZjFkLTljZjY1OTlhYjY0OSJ9.Hf3pEGOqe-S_tX821QPjzUXOsmX48rS33Kl1wDuORlc"
        }
      });
      const data = await response.json();
      setAds(data);
    };
    fetchAds();
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Ads</h2>

      {ads.length === 0 ? (
        <p className="text-gray-600">No ads available.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {ads.map((ad) => (
            <div key={ad.id} className="p-4 border border-gray-300 rounded-lg">
              <h3 className="font-semibold text-lg">{ad.name}</h3>
              
              {ad.media_url && (
                <img
                  src={ad.media_url}
                  alt="Ad"
                  className="w-full h-32 object-cover rounded-lg mt-2"
                />
              )}
              <a
                href={ad.target_url}
                className="text-blue-500 hover:underline mt-2 block"
                target="_blank"
              >
                View Ad
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
