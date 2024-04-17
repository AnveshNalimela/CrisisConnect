import React from "react";
import About from "./About.jsx";
import Crisis from "./Crisis.jsx";
import Donate from "./Donate.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
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
