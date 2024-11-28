import { useLocation } from "react-router-dom";

function Result() {
  const location = useLocation();
  const result = location.state.data;

  return (
    <div className="min-h-screen text-gray-800 pt-16 pb-10 flex flex-col items-center">
      <section className="bg-gradient-to-b from-yellow-200 to-yellow-100 w-full py-16 px-4 md:px-8 text-center">
        <h2 className="text-4xl font-semibold text-orange-600">
          Estimate Solar Potential
        </h2>
        <p className="text-lg mt-4 text-gray-700">
          Select a portion of the map to estimate the rooftop area and potential
          solar energy output.
        </p>
      </section>

      <section className="mt-12 w-4/5 max-w-4xl">
        <h3 className="text-2xl font-semibold text-orange-600 mb-4">
          Selected Area
        </h3>
        <div className="bg-white rounded-lg  flex justify-center shadow-md p-6">
          <img
            src={result.imageUrl}
            alt="Selected Map Area"
            style={{ width: "512px", height: "512px" }}
            className="rounded-lg object-fit h-full w-full"
          />
        </div>
      </section>

      <section className="mt-12 w-4/5 max-w-4xl bg-yellow-50 rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-orange-600 mb-4">
          Estimation Results
        </h3>
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            <strong>Total Rooftop Area:</strong>{" "}
            {`${result.rooftopArea} sq. meters`}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Estimated Solar Energy:</strong>{" "}
            {`${result.power} kWh per year`}
          </p>
        </div>
      </section>
    </div>
  );
}

export default Result;
