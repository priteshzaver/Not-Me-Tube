import firebase from "firebase/app";
import "firebase/auth";
import { BrowserRouter } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { useEffect, useState } from "react";
import { getUserDetails, onLoginStatusChange } from "./modules/authManager";
import { Header } from "./Header";

export const NotMeTube = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      <Header isLoggedIn={isLoggedIn} role={role} />
      <ApplicationViews isLoggedIn={isLoggedIn} role={role} />
    </BrowserRouter>
  );
};
