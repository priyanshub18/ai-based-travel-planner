import { AI_PROMPTS, SelectBudgetOptions, SelectTravelsList } from "../constants/option";
import { Input } from "../components/ui/input";
import React, { useDebugValue, useEffect } from "react";
import { useState } from "react";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { chatSession } from "../service/AIModel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";

function CreateTrip() {
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const login = useGoogleLogin({
    onSuccess: (response) => console.log(response),
    onError: (error) => console.log(error),
  });
  const onGenerateTrip = async () => {
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

    const FINAL_PROMT = AI_PROMPTS.replace("{location}", formData?.place?.label).replace("{totalDays}", formData?.noOfDays).replace("{traveler}", formData?.traveller).replace("{budget}", formData?.budget).replace("{totalDays}", formData?.noOfDays);
    // console.log("Sending the req");
    //
    const result = await chatSession.sendMessage(FINAL_PROMT);
    // console.log("Reecieved some request");

    console.log(result?.response?.text());
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);
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
            Generate Trip
          </button>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
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
      </div>
    </div>
  );
}

export default CreateTrip;
