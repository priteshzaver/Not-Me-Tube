import firebase from "firebase/app";
import "firebase/auth";
import { ApplicationViews } from "./ApplicationViews";
import { useEffect, useState } from "react";
import { getUserDetails, onLoginStatusChange } from "./modules/authManager";
import { Header } from "./components/nav/Header";
import { Spinner } from "./helpers/Spinner";
import { BrowserRouter as Router } from "react-router-dom";
import { SideBar } from "./components/nav/SideBar";

export const NotMeTube = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(null);
	const [currentUser, setCurrentUser] = useState();

	useEffect(() => {
		onLoginStatusChange(setIsLoggedIn);
	}, []);

	useEffect(() => {
		if (isLoggedIn) {
			// firebase.auth().currentUser.uid grabs the firebaseUUID -- firebase has many helpers like this
			getUserDetails(firebase.auth().currentUser.uid).then((userObject) =>
				setCurrentUser(userObject)
			);
		}
	}, [isLoggedIn]);

	if (isLoggedIn === null) {
		return <Spinner className="app-spinner dark" />;
	}

	return (
		<Router>
			<Header isLoggedIn={isLoggedIn} role={currentUser?.userType?.role} />
			<SideBar isLoggedIn={isLoggedIn} currentUser={currentUser} />
			<ApplicationViews
				isLoggedIn={isLoggedIn}
				role={currentUser?.userType?.role}
				currentUser={currentUser}
			/>
		</Router>
	);
};

// useEffect(() => {
// 	if (isLoggedIn) {
// 		// firebase.auth().currentUser.uid grabs the firebaseUUID -- firebase has many helpers like this
// 		getUserDetails(firebase.auth().currentUser.uid).then((userObject) => {
// 			setRole(userObject.userType.name);
// 		});
// 	} else {
// 		setRole("");
// 	}
// }, [isLoggedIn]);  DO NOT DELETE UNTIL ROLE IS CONFIRMED TO BE WORKING
