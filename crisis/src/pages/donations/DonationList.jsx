// DonationList.js
import axios from "axios";
import React, { useEffect, useState } from "react";

const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const fetchDonations = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getDonations"); // Replace with your API endpoint
      setDonations(response.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <div className="donation-list mb-10 mt-10">
      <h2 className="font-semibold text-green-400 text-2xl">
        List of Donations
      </h2>
      <div className="donation-grid mt-4 mb-4">
        {donations.map((donation) => (
          <div key={donation.id} className="donation-item">
            <p className="font-semibold text-lg text-blue-400">
              "{donation.message}"
            </p>
            <p className="">By : {donation.name}</p>

            <p className="font-bold ">Amount: ${donation.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationList;
