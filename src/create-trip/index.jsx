import { AI_PROMPTS, SelectBudgetOptions, SelectTravelsList } from "../constants/option";
import { Input } from "../components/ui/input";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { chatSession } from "../service/AIModel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { setDoc, doc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { db } from "../service/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setloading] = useState(false);
  //TODO add a custom waiting time period wherr you can show some videos and some fact
  // const [fact , setFact] = useState("");
  // const generateFact= () =>{
  //   const fact = axios.get("https://api.api-ninjas.com/v1/facts");
  //   log(fact);
  // }
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response);
      getUserProfile(response);
      // console.log("hi after some call");
    },
    onError: (error) => console.log(error),
  });
  const onGenerateTrip = async () => {
    // generateFact();
    console.log("Clicked on a button");
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (formData?.noOfDays > 5) {
      // alert("Please select less than 5 days");
      toast("Please choose less than 5 days");
      return;
    } else if (!formData?.place || !formData?.budget || !formData?.traveller) {
      toast("Please fill all the fields");
      return;
    }
    setloading(true);
    const FINAL_PROMT = AI_PROMPTS.replace("{location}", formData?.place?.label).replace("{totalDays}", formData?.noOfDays).replace("{traveler}", formData?.traveller).replace("{budget}", formData?.budget).replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMT);
    setloading(false);
    console.log(result?.response?.text());
    SaveAiTrip(result?.response?.text());
  };
  const SaveAiTrip = async (result) => {
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user"));
    const to_remove = "````";
    result = result.slice(to_remove.length, result.length - to_remove.length);
    let ans = result.slice(7);
    ans = "{" + ans;
    console.log(ans);
    const Json_res = JSON.parse(ans);
    setloading(true);
    await setDoc(doc(db, "AITrips", docId), {
      id: docId,
      userSelection: formData,
      tripData: Json_res,
      userEmail: user?.email,
    });
    setloading(false);

    navigate("/view-trip/" + docId);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const getUserProfile = (token) => {
    // console.log("Inside this function");
    const data = axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token?.access_token}`, { headers: { Authorization: `Bearer ${token?.access_token}`, Accept: "application/json" } }).then((res) => {
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res.data));
      setOpenDialog(false);
      onGenerateTrip();
    });

    // console.log("Outside this function");
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your Travel Preference 💸🏖️</h2>
      <p className="mt-3 text-gray-500 text-xl">Just provide some basic information , and our trip planner will generate a customized iternary based on your preferences</p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            // change the api please
            apiKey="AIzaSyDMkZJSXUDbwzxjwQqek0S9-cxK_CRAIyg"
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("place", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            onChange={(e) => {
              handleInputChange("noOfDays", e.target.value);
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  handleInputChange("budget", item.title);
                }}
                className={`p-4 border rounded-lg hover:shadow flex flex-col items-center cursor-pointer ${formData?.budget == item.title && "border-[#130705] border-2"}`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">Select Travel List:</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  handleInputChange("traveller", item.title);
                }}
                className={`p-4 border rounded-lg hover:shadow flex flex-col items-center cursor-pointer ${formData?.traveller == item.title && "border-[#130705] border-2 shadow-md"}`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={onGenerateTrip} className="bg-[#130705] text-white py-3 px-5 rounded-lg">
            {loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : "Generate Trip"}
            {/* <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    /> */}
          </button>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog} >
          <DialogContent>
            <DialogHeader>
              <DialogDescription  className="max-w-fit">
                <div className="flex justify-center flex-col items-center">
                  <img src="/logo.svg" alt="" />
                  <h2 className="text-lg font-bold mt-10">Sign in With Google</h2>
                  <p>Signin in the app with Google Authentication</p>
                  <Button onClick={login} className="w-full mt-4">
                    Sign in With Google
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        {/* // TODO add a custom waiting time period wherr you can show some videos and some fact */}
        <Dialog open={loading} onOpenChange={setloading}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <div className="flex justify-center flex-col items-center">
                  <h2 className="text-xl  mt-10 font-black">Generating Trip</h2>
                  <p className="text-md text-black mt-2 mb-10">Please wait while we generate your trip</p>
                  <AiOutlineLoading3Quarters className="h-10 w-10 animate-spin mb-10" />
                  {/* <p className="text-md text-black mt-2 text-center">
                  A person susceptible to <span className="text-red-600">wanderlust</span> is not so much addicted to movement as committed to transformation.
                  </p> */}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
