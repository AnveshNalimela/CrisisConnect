import axios from "axios";
import React, { useEffect, useState } from "react";

const Crisis = () => {
  const [focus, setFocus] = useState(false);
  const [Disasters, setDisaster] = useState([]);
  const fetchDisasters = () => {
    axios
      .get("http://localhost:3001/getDisasters")
      .then((res) => setDisaster(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchDisasters();
  }, []);
  console.log(Disasters);
  Disasters.map((Disaster) => {
    console.log(Disaster.location);
  });
  return (
    <div className="w-full  bg-cyan-300 p-10">
      <h2 className="text-center text-4xl font-bold text-black py-10">
        Recent Crisis.......
      </h2>
      <div className="w-full flex  justify-center">
        {Disasters.map((disaster) => (
          <div
            key={disaster._id}
            className="max-w-sm rounded mx-5 overflow-hidden shadow-lg bg-white transform hover:scale-1.2 transition-transform"
          >
            <img
              className="w-full h-80 p-4 border-3"
              src={disaster.uploadedPhotos[0]}
              alt="{disaster.crisisType}image"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                {disaster.crisisType}:{disaster.location}
              </div>
              <p className="text-gray-700 text-base">{disaster.description}</p>
              <div>
                <h2 className="text-lg font-bold">
                  No.of Casulalites:{disaster.casualties}
                </h2>
                <p className="text-zinc-600">
                  Affected Count:{disaster.affectedPopulation}
                </p>
                <p className="text-zinc-600">
                  Level Of Serverity:{disaster.severity}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crisis;
