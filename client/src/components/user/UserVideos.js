import { useContext, useEffect, useState } from "react";
import { getAllVideosByUserId } from "../../modules/videoManager";
import "firebase/auth";
import { UserVideosList } from "./UserVideosList";
import UserContext from "../../UserContext";

export const UserVideos = () => {
	const [videos, setVideos] = useState([]);
	const { currentUser } = useContext(UserContext);
	useEffect(() => {
		getAllVideosByUserId(currentUser?.id).then(setVideos);
	}, [currentUser]);

	return (
		<div className="flex w-full h-full bg-gradient-to-br from-cyan-100 to-blue-300">
			<UserVideosList videos={videos} />
		</div>
	);
};
