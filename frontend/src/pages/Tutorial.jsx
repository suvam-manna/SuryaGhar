import React from 'react';

function Tutorial() {
  return (
    <div className="min-h-screen pt-16 pb-10 text-gray-800 flex flex-col items-center">
      <section className="bg-gradient-to-b from-yellow-200 to-yellow-100 w-full py-16 px-4 md:px-8 text-center">
        <h2 className="text-4xl font-semibold text-orange-600">How to Use SuryaGhar</h2>
        <p className="text-lg mt-4 text-gray-700">
          Learn to navigate the platform and estimate your rooftop’s solar potential.
        </p>
      </section>

      <section className="w-4/5 max-w-6xl mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <img src="/images/tutorial1.jpg" alt="Tutorial Step 1" className="rounded-lg shadow-md object-cover h-64 w-full" />
        <img src="/images/tutorial2.jpg" alt="Tutorial Step 2" className="rounded-lg shadow-md object-cover h-64 w-full" />
        <img src="/images/tutorial3.jpg" alt="Tutorial Step 3" className="rounded-lg shadow-md object-cover h-64 w-full" />
        <img src="/images/tutorial4.jpg" alt="Tutorial Step 4" className="rounded-lg shadow-md object-cover h-64 w-full" />
      </section>

      <section className="w-4/5 max-w-3xl mt-16 mb-10 text-center">
        <h3 className="text-2xl font-semibold text-orange-600 mb-4">Watch the Tutorial Video</h3>
        <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md">
          <video controls className="w-full h-64 md:h-96">
            <source src="/videos/tutorial-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </div>
  );
}

export default Tutorial;
