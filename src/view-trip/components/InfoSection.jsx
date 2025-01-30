// import { GetPlaceDetails } from "../../service/GlobalApi";
import { Button } from "../../components/ui/button";
import React, { useState } from "react";
import { MdOutlineSend } from "react-icons/md";
import { useEffect } from "react";
import axios from "axios";
function InfoSection({ trip }) {
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
    <div>
      <img src={photoUrl ? photoUrl : "/placeholder.jpg"} alt="placeholder" className="h-[300px] w-full object-cover rounded-xl" />
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
