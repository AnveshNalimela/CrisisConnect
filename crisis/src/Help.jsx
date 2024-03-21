import React from "react";
import "./styles.css";

const Help = () => {
  return (
    <div className="w-full h-500 pb-10 bg-sky-300 ">
      <h1 className="text-center text-3xl font-semibold text-black py-4">
        Help for people seeking for God..! Be their GOD...
      </h1>
      <div className="flex justify-center  items-center space-x-10">
        <div className="w-100 h-70 p-8  mx-20 my-5 text-3xl text-white bg-green-500  hover:bg-green-600 transition:300s rounded ">
          Wanna be a Volunteer..!!
          <a
            className="bn39 mt-5 text-2xl flex justify-center  items-center  "
            href="/"
          >
            <span class="bn39span">Register</span>
          </a>
        </div>
        <div className="relative w-32 h-32 flex justify-center items-center">
          <div className="text-4xl font-bold">13,000</div>
          <div className="absolute bottom-0 px-10 text-center text-2xl text-gray-600">
            Volunteers
          </div>
        </div>
        <div className="relative w-32 h-32 flex justify-center items-center">
          <div className="text-4xl font-bold">4,000</div>
          <div className="absolute bottom-0 px-10  text-center text-2xl text-gray-600">
            Donations
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
