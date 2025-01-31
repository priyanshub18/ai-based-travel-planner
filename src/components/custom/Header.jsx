import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useMatch, useNavigate, useNavigation } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { set } from "zod";
function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response);
      getUserProfile(response);
      // console.log("hi after some call");
    },
    onError: (error) => console.log(error),
  });

  const getUserProfile = (token) => {
    // console.log("Inside this function");
    const data = axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token?.access_token}`, { headers: { Authorization: `Bearer ${token?.access_token}`, Accept: "application/json" } }).then((res) => {
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res.data));
      setOpenDialog(false);
      // onGenerateTrip();
    });

    // console.log("Outside this function");
  };

  const user = JSON.parse(localStorage.getItem("user"));
  // const navigate = useNavigation();
  useEffect(() => {
    // console.log("Inside this header thingy");

    if (user) {
      setIsLoggedIn(true);
      console.log(user);
    } else {
      setIsLoggedIn(false);
      // navigate("/create-trip");
    }
  }, [user]);
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <a href="/">
        <img src="/logo1.svg" alt="" className="h-10 w-50 cursor-pointer" />
      </a>

      <div className="flex gap-2 align-middle">
        {user && <h2 className=" hidden lg:block text-black p-[10px] rounded-lg font-medium">Welcome, {user?.name}</h2>}
        {user ? (
          <div className="flex gap-3 align-middle">
            <a href="/my-trips">
              <Button className="mt-1">My Trips</Button>
            </a>
            {/* 
            <img src={user?.picture} className="h-[50px] w-[50px] rounded-3xl"></img> */}

            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className="h-[50px] w-[50px] rounded-3xl"></img>
              </PopoverTrigger>
              <PopoverContent>
                <Button
                  className="w-full"
                  onClick={() => {
                    googleLogout();
                    localStorage.removeItem("user");
                    setIsLoggedIn(false);
                    window.location.reload();
                    // navigate("/create-trip");
                  }}
                >
                  LogOut
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Sign in
          </Button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="">
          <DialogHeader>
            <DialogDescription>
              <div className="flex justify-center flex-col items-center ">
                <img src="/logo3.png" alt="" className="rounded-xl" />

                <h2 className="text-lg font-bold mt-10">Sign in With Google</h2>
                <p className="">Signin in the app with Google Authentication</p>

                <Button onClick={login} className="w-full mt-4">
                  Sign in With Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
