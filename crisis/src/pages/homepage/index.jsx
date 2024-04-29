import React from "react";
import Footer from "../../Components/Footer.jsx";
import Header from "../../Components/Header.jsx";
import About from "./About.jsx";
import Crisis from "./Crisis.jsx";
import Donate from "./Donate.jsx";
import Help from "./Help.jsx";

const HomePage = () => {
  return (
    <>
      <Header />
      <About />
      <Crisis />
      <Donate />
      <Help />
      <Footer />
    </>
  );
};

export default HomePage;
