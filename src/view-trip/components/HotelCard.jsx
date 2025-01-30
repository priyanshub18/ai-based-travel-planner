import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
function HotelCard({ item, index }) {
  const [photoUrl, setphotoUrl] = useState("");
  const API_KEY = "AIzaSyDEYoYidQ4EEVYxliPT9O_VEUW-6yxjeSE";
  useEffect(() => {
    item && GetPlacePhoto();
  }, [item]);
  const PHOTO_REF_URL = "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&&maxWidthPx=1000&&key=" + API_KEY;
  const GetPlacePhoto = async () => {
    const url = `https://places.googleapis.com/v1/places:searchText?key=${API_KEY}`;
    const requestData = {
      textQuery: item?.hotelName,
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
        const photoURL = PHOTO_REF_URL.replace("{NAME}", response.data.places[0].photos[3].name);
        setphotoUrl(photoURL);
      });
  };
  return (
    <Link to={"https://www.google.com/maps/search/?api=1&query=" + item?.hotelAddress + " " + item?.hotelAddress} target="_blank" rel="noreferrer" key={index}>
      <div className="hover:shadow-md hover:scale-105 transition-all  rounded-lg p-5 flex flex-col  cursor-pointer ">
        <img src={photoUrl ? photoUrl : "/placeholder.jpg"} alt="placeholder" className="h-[200px] w-full object-cover rounded-xl" key={index} />
        <div className="my-3 flex flex-col gap-2 items-start">
          <h2 className="font-medium">{item?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {item?.hotelAddress}</h2>
          <h2 className="font-sm">💵 {item?.price}</h2>
          <h2 className="font-sm">⭐ {item?.rating} stars</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCard;
