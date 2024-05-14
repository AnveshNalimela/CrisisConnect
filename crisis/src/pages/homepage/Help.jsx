import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Help = () => {
  const [volunteerCnt, setVolunteerCnt] = useState(0);
  const [donationAmout, setDonationAmount] = useState(0);
  const countDocuments = async () => {
    try {
      const response = await axios.get("http://localhost:3001/countVolunteer");
      const res = await axios.get("http://localhost:3001/totalDonations");
      console.log(
        "Total count of volunteers: and amount",
        response.data,
        res.data
      );
      setVolunteerCnt(response.data);
      setDonationAmount(res.data);
    } catch (error) {
      console.error("Error while fetching count of volunteers:", error);
    }
  };

  useEffect(() => {
    countDocuments();
  }, []);

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
            href="/volunteer"
          >
            <span className="bn39span">Register</span>
          </a>
        </div>
        <Link to="/volunteer">
          <div className="relative w-32 h-32 flex justify-center items-center">
            <div className="text-4xl font-bold">{volunteerCnt}</div>
            <div className="absolute bottom-0 px-10 text-center text-2xl text-gray-600">
              Volunteers
            </div>
          </div>
        </Link>
        <Link to="/Donations">
          <div className="relative w-32 h-32 flex justify-center items-center">
            <div className="text-4xl font-bold">
              {donationAmout.totalDonations}
            </div>
            <div className="absolute bottom-0 px-10  text-center text-2xl text-gray-600">
              Donations
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Help;
