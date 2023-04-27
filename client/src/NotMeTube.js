import firebase from "firebase/app";
import "firebase/auth";
import { BrowserRouter } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { useEffect, useState } from "react";
import { getUserDetails, onLoginStatusChange } from "./modules/authManager";

export const NotMeTube = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUserDetails(firebase.auth().currentUser.uid).then((userObject) => {
        setRole(userObject.userType.name);
      });
    } else {
      setRole("");
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <ApplicationViews />
    </BrowserRouter>
  );
};
