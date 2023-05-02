import firebase from "firebase/app";
import "firebase/auth";
import { ApplicationViews } from "./ApplicationViews";
import { useEffect, useState } from "react";
import { getUserDetails, onLoginStatusChange } from "./modules/authManager";
import { Header } from "./Header";
import { Spinner } from "./helpers/Spinner";
import { BrowserRouter as Router } from "react-router-dom";

export const NotMeTube = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(null),
		[role, setRole] = useState("");

	useEffect(() => {
		onLoginStatusChange(setIsLoggedIn);
	}, []);

	useEffect(() => {
		if (isLoggedIn) {
			// firebase.auth().currentUser.uid grabs the firebaseUUID -- firebase has many helpers like this
			getUserDetails(firebase.auth().currentUser.uid).then((userObject) => {
				setRole(userObject.userType.name);
			});
		} else {
			setRole("");
		}
	}, [isLoggedIn]);

	if (isLoggedIn === null) {
		return <Spinner className="app-spinner dark" />;
	}

	return (
		<Router>
			<Header isLoggedIn={isLoggedIn} role={role} />
			<ApplicationViews isLoggedIn={isLoggedIn} role={role} />
		</Router>
	);
};
