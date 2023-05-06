import firebase from "firebase/app";
import "firebase/auth";
import { ApplicationViews } from "./ApplicationViews";
import { useEffect, useState } from "react";
import { getUserDetails, onLoginStatusChange } from "./modules/authManager";
import { Spinner } from "./helpers/Spinner";
import { BrowserRouter as Router } from "react-router-dom";
import { SideBar } from "./components/nav/SideBar";
import UserContext from "./UserContext";
import { Header } from "./components/nav/Header";

export const NotMeTube = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(null);
	const [currentUser, setCurrentUser] = useState();
	const [videos, setVideos] = useState([]);

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
			<UserContext.Provider value={{ currentUser }}>
				<div className="relative flex h-screen flex-col">
					<Header isLoggedIn={isLoggedIn} setVideos={setVideos} />
					<div className="absolute top-16 flex h-[calc(100vh-13.5rem)] flex-row">
						<SideBar isLoggedIn={isLoggedIn} />
						<ApplicationViews isLoggedIn={isLoggedIn} videos={videos} />
					</div>
				</div>
			</UserContext.Provider>
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
