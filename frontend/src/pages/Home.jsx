import React from 'react';

function Home() {
  return (
    <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 min-h-screen text-gray-800 pt-14">
      <section className="flex flex-col items-center py-16 px-4 md:px-8">
        <div className="max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-orange-600">Harness the Power of the Sun</h2>
          <p className="text-lg mt-6 text-gray-600">
            SuryaGhar leverages deep learning to extract building footprints and calculate potential solar energy 
            output for any rooftop. Start your journey toward sustainable energy by exploring your rooftop’s potential.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto text-center px-4 md:px-8">
          <h3 className="text-3xl md:text-4xl font-semibold text-orange-600">Why Choose SuryaGhar?</h3>
          <p className="text-lg mt-4 text-gray-600">
            Built with advanced deep learning technology, SuryaGhar provides accurate, efficient, and accessible 
            insights for maximizing your rooftop’s solar potential.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
            <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-orange-600">AI-Powered Accuracy</h4>
              <p className="mt-2 text-gray-600">
                Our deep learning model accurately identifies rooftop areas, ensuring optimal energy estimations.
              </p>
            </div>
        
            <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-orange-600">User-Friendly Interface</h4>
              <p className="mt-2 text-gray-600">
                Experience a seamless interface designed for everyone, from energy enthusiasts to solar experts.
              </p>
            </div>
    
            <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-orange-600">Sustainable Savings</h4>
              <p className="mt-2 text-gray-600">
                Calculate energy savings and make informed decisions for a greener, sustainable future.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
