import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16 ">
        <span className="text-[#f56551]">Discover Your Next Adventure with AI: </span>
        <br />
        Personalised Iternaries at Your FingerTips
      </h1>
      <p className="text-xl text-gray-500 text-center">Your Personal trip planner and travel curator, creating custom iternaries tailored at your interests and budget</p>
      <Link to={"/create-trip"}>
        <Button>Get Started</Button>
      </Link>
      {/* <img src="/starter.png" alt="" className="w-full rounded-lg" /> */}
    </div>
  );
}

export default Hero;
