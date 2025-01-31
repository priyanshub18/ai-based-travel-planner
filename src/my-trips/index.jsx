import { db } from "../service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import UserTripCard from "./components/UserTripCard";

function MyTrips() {
  const [userTrips, setUserTrips] = useState([]);
  useEffect(() => {
    GetUserTrips();
  }, []);
  const navigate = useNavigation();

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    setUserTrips([]);
    const q = query(collection(db, "AITrips"), where("userEmail", "==", user.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      
      setUserTrips((prev) => [...prev, doc.data()]);
    });
  };
  return (
    <div>
      <h2 className="p-10 md:px-20 text-center text-3xl font-bold">My Trips (Past 5 Trips)</h2>
      
      <div className="mx-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {userTrips.map((trip, index) => (
          (index-5 >= 0) && <UserTripCard key={index} trip={trip}  />
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
