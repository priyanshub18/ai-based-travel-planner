import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  //   const [time , setTime] = useState(9);
  return (
    <div>
      <h2 className="font-bold text-lg mt-5 ">Places to Visit</h2>
      <div>
        {trip?.tripData?.itinerary.map((item, index) => (
          <div key={index}>
            <h2 className="font-bold text-xl mt-5 ">DAY {item?.day}</h2>
            <div className="grid  grid-cols-1 md:grid-cols-2 gap-4 ">
              {/* <h2>{item?.bestTimeToVisit}</h2> */}
              {item.places.map((place, index) => (
                <div key={index} className="my-3  border border-gray-100 hover:border-black  hover:border-2 transition-all duration-200 p-4 rounded-lg  ">
                  <h2 className="font-medium text-sm text-orange-400  mx-2">Time To Travel: {place.timeToTravel}</h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
