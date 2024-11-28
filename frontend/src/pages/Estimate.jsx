import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import dataContext from "../contexts/dataContext.js";

function Estimate() {
  const { data } = useContext(dataContext);
  const [imageReady, setImageReady] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // Preload the image when data.imageUrl changes
  useEffect(() => {
    if (data.imageUrl) {
      const img = new Image();
      img.src = data.imageUrl;
      img.onload = () => {
        setImageReady(true);
        setImageUrl(data.imageUrl); // Set the imageUrl only when the image loads
      };
    }
  }, [data.imageUrl]);

  useEffect(() => {
    console.log("Updated data in Estimate:", data);
  }, [data]);

  console.log('data:', data);
  console.log('imageUrl:', imageUrl);

  return (
    <div className="min-h-screen text-gray-800 pt-16 pb-10 flex flex-col items-center">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-yellow-200 to-yellow-100 w-full py-16 px-4 md:px-8 text-center">
        <h2 className="text-4xl font-semibold text-orange-600">Estimate Solar Potential</h2>
        <p className="text-lg mt-4 text-gray-700">
          Select a portion of the map to estimate the rooftop area and potential solar energy output.
        </p>
      </section>

      {/* Button to Open Map */}
      <Link to="/map">
        <button className="mt-10 bg-orange-600 hover:bg-orange-700 text-yellow-100 font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300">
          Click to Open Map
        </button>
      </Link>

      {/* Selected Area Section */}
      <section className="mt-12 w-4/5 max-w-4xl">
        <h3 className="text-2xl font-semibold text-orange-600 mb-4">Selected Area</h3>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="bg-gray-200 h-60 md:h-80 rounded-lg flex items-center justify-center text-gray-500 overflow-hidden relative">
            {imageReady ? (
              <img
                src={imageUrl}
                alt="Selected Map Area"
                className="rounded-lg object-cover h-full w-full"
              />
            ) : (
              <span>Map image of selected area will appear here</span>
            )}
          </div>
        </div>
      </section>

      {/* Estimation Results Section */}
      {data.imageUrl && imageReady && (
        <section className="mt-12 w-4/5 max-w-4xl bg-yellow-50 rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">Estimation Results</h3>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              <strong>Total Rooftop Area:</strong> {`${data.roofTopArea} sq. meters`}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Estimated Solar Energy:</strong> {`${data.power} kWh per year`}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export default Estimate;
