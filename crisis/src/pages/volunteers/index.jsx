import React from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import NewVolunteer from "./NewVolunteer";
import Volunteers from "./volunteers";

const Volunteer = () => {
  return (
    <>
      <Header />
      <NewVolunteer />
      <Volunteers />
      <Footer />
    </>
  );
};

export default Volunteer;
