import React from "react";
import Intro from "../Intro";
import HomeService from "../HomeService";
import Explore from "../Explore";
import Scroll from "../Scroll";

const Home = () => {
  return (
    <>
      <Intro />
      <HomeService />
      <Explore />
      <Scroll />
    </>
  );
};

export default Home;