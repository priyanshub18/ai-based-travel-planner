import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    // <div className="flex flex-col items-center mx-56 gap-9">
    //   <h1 className="font-extrabold text-[50px]  text-center mt-16 ">
    //     <span className="text-[#f56551]">Discover Your Next Adventure with AI: </span>
    //     <br />
    //     Personalised Iternaries at Your FingerTips
    //   </h1>
    //   <p className="text-xl text-gray-500 text-center hidden md:block">Your Personal trip planner and travel curator, creating custom iternaries tailored at your interests and budget</p>
    //   <Link to={"/create-trip"}>
    //     <Button>Get Started</Button>
    //   </Link>
    //   {/* <img src="/starter.png" alt="" className="w-full rounded-lg" /> */}
    // </div>
    <div className="flex flex-col items-center mx-4 md:mx-20 lg:mx-56 gap-6 md:gap-9">
      <h1 className="font-extrabold text-3xl md:text-[50px] text-center mt-10 md:mt-16 p-4 leading-tight">
        <span className="text-[#f56551] m-4">Discover Your Next Adventure with AI: </span>
        <br />
        Personalised Itineraries at Your Fingertips
      </h1>
      <p className="text-lg md:text-xl text-gray-500 text-center hidden sm:block">Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
      <Link to={"/create-trip"}>
        <Button className="px-6 py-3 text-lg md:text-xl">Get Started</Button>
      </Link>
      <img src="/mockup.png" alt="" className="md:max-w-full rounded-lg px-20" />
    </div>
  );
}

export default Hero;
