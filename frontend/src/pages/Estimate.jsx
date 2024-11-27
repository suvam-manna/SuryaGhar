import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import dataContext from '../contexts/dataContext.js';

function Estimate() {
  const {data} = useContext(dataContext);

  return (
    <div className="min-h-screen text-gray-800 pt-16 pb-10 flex flex-col items-center">
      <section className="bg-gradient-to-b from-yellow-200 to-yellow-100 w-full py-16 px-4 md:px-8 text-center">
        <h2 className="text-4xl font-semibold text-orange-600">Estimate Solar Potential</h2>
        <p className="text-lg mt-4 text-gray-700">
          Select a portion of the map to estimate the rooftop area and potential solar energy output.
        </p>
      </section>

      <Link to="/map">
        <button className="mt-10 bg-orange-600 hover:bg-orange-700 text-yellow-100 font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300">Click to Open Map </button>
      </Link>

      <section className="mt-12 w-4/5 max-w-4xl">
        <h3 className="text-2xl font-semibold text-orange-600 mb-4">Selected Area</h3>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="bg-gray-200 h-60 md:h-80 rounded-lg flex items-center justify-center text-gray-500">
            {Object.keys(data).length != 0 ? (
              <img src={mapData.imageUrl} alt="Selected Map Area" className="rounded-lg object-cover h-full w-full" />
            ) : (
              "Map image of selected area will appear here"
            )}
          </div>
        </div>
      </section>

      {Object.keys(data).length != 0 && (
        <section className="mt-12 w-4/5 max-w-4xl bg-yellow-50 rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">Estimation Results</h3>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              <strong>Total Rooftop Area:</strong> {`${estimationData.area} sq. meters`}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Estimated Solar Energy:</strong> {`${estimationData.solarEnergy} kWh per year`}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export default Estimate;
