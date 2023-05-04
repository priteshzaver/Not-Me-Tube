import firebase from "firebase/app";
import "firebase/auth";
import { ApplicationViews } from "./ApplicationViews";
import { useEffect, useState } from "react";
import { getUserDetails, onLoginStatusChange } from "./modules/authManager";
import { Header } from "./components/nav/Header";
import { Spinner } from "./helpers/Spinner";
import { BrowserRouter as Router } from "react-router-dom";
import { SideBar } from "./components/nav/SideBar";
import UserContext from "./UserContext";

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
			<UserContext.Provider value={{ currentUser }}>
				<div className="relative flex h-screen flex-col">
					<Header isLoggedIn={isLoggedIn} role={currentUser?.userType?.role} />
					<div className="absolute top-14 flex h-[calc(100vh-13.5rem)] flex-row">
						<SideBar isLoggedIn={isLoggedIn} currentUser={currentUser} />
						<ApplicationViews
							isLoggedIn={isLoggedIn}
							role={currentUser?.userType?.role}
							currentUser={currentUser}
						/>
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
