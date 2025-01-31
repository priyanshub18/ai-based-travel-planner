import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCard({ trip }) {
  const [photoUrl, setphotoUrl] = useState("");
  const API_KEY = "AIzaSyDEYoYidQ4EEVYxliPT9O_VEUW-6yxjeSE";
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);
  const PHOTO_REF_URL = "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&&maxWidthPx=1000&&key=" + API_KEY;
  const GetPlacePhoto = async () => {
    const url = `https://places.googleapis.com/v1/places:searchText?key=${API_KEY}`;
    const requestData = {
      textQuery: trip?.userSelection?.place?.label,
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
    <Link to={"/view-trip/" + trip?.id} target="_blank" rel="noreferrer">
      <div className="rounded-xl hover:border-1 border-gray-200 border-solid p-5 transition-all hover:shadow-md hover:scale-105 ">
        <img src={photoUrl ? photoUrl : "/placeholder.png"} alt="" className="object-cover rounded-xl h-[400px] w-full" />
        <div>
          <h2 className="font-bold text-lg">{trip?.userSelection?.place?.label}</h2>
          <h2>
            {trip?.userSelection?.noOfDays} Days Trip With {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCard;
