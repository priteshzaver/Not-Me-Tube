import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NotMeTube } from "./NotMeTube";
import firebase from "firebase/app";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
};
firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
		<NotMeTube />
);
