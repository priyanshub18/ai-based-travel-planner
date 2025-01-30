import React, { useEffect } from "react";
import HotelCard from "./HotelCard";

function Hotel({ trip }) {
  
  return (
    <div>
      <h2 className="font-bold text-xl mt-5 ">Hotel Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 ">
        {trip?.tripData?.hotelOptions.map((item, index) => (
          <HotelCard item={item} index={index}/>
        ))}
      </div>
    </div>
  );
}

export default Hotel;
