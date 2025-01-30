import { Button } from "../../components/ui/button";
import React from "react";

import { FaMapLocation } from "react-icons/fa6";
import { Link } from "react-router-dom";
function PlaceCardItem({ place }) {
  return (
    <div className="rounded-xl p-3 flex gap-5 mt-2 ">
      <img src="/vite/svg" alt="" className="w-[130px] h-[130px] rounded-xl" />
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-xl">{place?.placeName}</h2>
        <p className="text-sm text-gray-600">{place?.placeDetails}</p>

        <h2 className="mt-10">💵 {place?.ticketPricing}</h2>

        <Link to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName + " "} target="_blank">
          <Button>
            <FaMapLocation /> Location
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default PlaceCardItem;
