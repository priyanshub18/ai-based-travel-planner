import React, { useEffect } from "react";
import { MdAddLocationAlt } from "react-icons/md";
import { Link } from "react-router-dom";
function Hotel({ trip }) {
  // useEffect(()=>{
  //     console.log(trip?.tripData?.travelPlan?.hotels[0])
  // },[trip?.tripData?.travelPlan?.hotels])
  return (
    <div>
      <h2 className="font-bold text-xl mt-5 ">Hotel Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 ">
        {trip?.tripData?.hotelOptions.map((item, index) => (
          <Link to={"https://www.google.com/maps/search/?api=1&query=" + item?.hotelAddress + " " + item?.hotelAddress} target="_blank" rel="noreferrer" key={index}>
            <div className="hover:shadow-md hover:scale-105 transition-all  rounded-lg p-5 flex flex-col  cursor-pointer " >
              <img src="/placeholder.jpg" alt="placeholder" className="h-[200px] w-full object-cover rounded-xl" key={index} />
              <div className="my-3 flex flex-col gap-2 items-start">
                <h2 className="font-medium">{item?.hotelName}</h2>
                <h2 className="text-xs text-gray-500">📍 {item?.hotelAddress}</h2>
                <h2 className="font-sm">💵 {item?.price}</h2>
                <h2 className="font-sm">⭐ {item?.rating} stars</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotel;
