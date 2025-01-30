import { Button } from "../../components/ui/button";
import React from "react";

import { FaMapLocation } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function PlaceCardItem({ place }) {
  const [photoUrl, setphotoUrl] = useState("");
  const API_KEY = "AIzaSyDEYoYidQ4EEVYxliPT9O_VEUW-6yxjeSE";
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);
  const PHOTO_REF_URL = "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&&maxWidthPx=1000&&key=" + API_KEY;
  const GetPlacePhoto = async () => {
    const url = `https://places.googleapis.com/v1/places:searchText?key=${API_KEY}`;
    const requestData = {
      textQuery: place?.placeName,
    };
    axios
      .post(url, requestData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Goog-FieldMask": ["places.photos", "places.displayName", "places.id"],
        },
      })
      .then((response) => {
        console.log(response.data.places[0].photos[3].name);
        const photoURL = PHOTO_REF_URL.replace("{NAME}", response.data.places[0].photos[0].name);
        setphotoUrl(photoURL);
      });
  };
  return (
    <div className="rounded-xl p-3 flex gap-5 mt-2 ">
      <img src={photoUrl ? photoUrl : "/placeholder.jpg"} alt="" className="w-full h-[150px] object-cover rounded-xl" />
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
