// App.js
import React from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import DonationList from "./DonationList";
import "./index.css";

function Donation() {
  return (
    <div className="App">
      <Header />

      <DonationList />
      <Footer />
    </div>
  );
}

export default Donation;
