import { useEffect, useState } from "react";
import { getAllVideosByUserId } from "../modules/videoManager";
import { VideoList } from "./VideoList";
import { getUserDetails } from "../modules/authManager";
import firebase from "firebase/app";
import "firebase/auth";

export const UserVideos = () => {
	const [videos, setVideos] = useState([]);
	const [currentUser, setCurrentUser] = useState([]);

	useEffect(() => {
		getUserDetails(firebase.auth().currentUser.uid).then(setCurrentUser);
	}, []);

	useEffect(() => {
		getAllVideosByUserId(currentUser.id).then(setVideos);
	}, [currentUser]);

	return (
		<article>
			<VideoList userVideos={videos} />
		</article>
	);
};
