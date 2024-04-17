import React from "react";

const Crisis = () => {
  return (
    <div className="w-full  bg-cyan-300 p-10">
      <div>
        <h2 className="text-center text-4xl font-bold text-black py-10">
          Recent Crisis.......
        </h2>
      </div>

      <div className="w-full flex  justify-center">
        <div className="max-w-sm rounded mx-5 overflow-hidden shadow-lg bg-white transform hover:scale-1.2 transition-transform">
          <img
            className="w-full p-4 border-3"
            src="https://ichef.bbci.co.uk/news/2048/cpsprodpb/1001B/production/_90836556_678c5ba9-3bc1-4237-864c-fa81f8ff720e.jpg"
            alt="Image"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">DERN FLOODS:2023</div>
            <p className="text-gray-700 text-base">
              Storm Daniel, also known as Cyclone Daniel, was the deadliest
              Mediterranean tropical-like cyclone in recorded history, as well
              as one of the costliest tropical cyclones on record outside of the
              north Atlantic Ocean
            </p>
          </div>
        </div>
        <div className="max-w-sm mx-5 rounded overflow-hidden shadow-lg bg-white transform hover:scale-120 transition-transform">
          <img
            className="w-full p-4 border-3"
            src="https://static01.nyt.com/images/2022/06/23/world/23afghanistan-photos-8/23afghanistan-photos-8-videoSixteenByNine3000.jpg
            "
            alt="Image"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Morocco Earthquake</div>
            <p className="text-gray-700 text-base">
              Magnitude: 6.8 Location: Al Haouz, Morocco Impact: 2,960
              fatalities
            </p>
          </div>
        </div>
        <div className="max-w-sm  mx-5 rounded overflow-hidden shadow-lg bg-white transform hover:scale-120 transition-transform">
          <img
            className="w-full p-4 border-3"
            src="https://cdn.thewire.in/wp-content/uploads/2021/04/06083549/2021_4img05_Apr_2021_PTI04_05_2021_000119B-scaled.jpg"
            alt="Image"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              Historic fires in Canada
            </div>
            <p className="text-gray-700 text-base">
              In 2023 forest fires destroyed nearly 400 million hectares (988
              million acres) of land around the world, killed more than 250
              people and emitted 6.5 billion tonnes of the greenhouse gas carbon
              dioxide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crisis;
