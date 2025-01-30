import { Button } from "../../components/ui/button";
import React from "react";
import { MdOutlineSend } from "react-icons/md";
function InfoSection({ trip }) {
  return (
    <div>
      <img src="/placeholder.jpg" alt="placeholder" className="h-[300px] w-full object-cover rounded-xl" />
      <div className="my-5 flex flex-col gap-5">
        <h2 className="font-bold text-2xl">{trip?.userSelection?.place?.label}</h2>
        <div className="flex flex-row justify-between items-center ">
          <div className="flex gap-3">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">📆 {trip?.userSelection?.noOfDays} Days</h2>

            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">💸 {trip?.userSelection?.budget} </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md"> 🥂 Type of Traveling : {trip?.userSelection?.traveller} </h2>
          </div>
          <Button>
            <MdOutlineSend />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
