import { useEffect, useState } from "react";
import { getAllVideosByUserId } from "../../modules/videoManager";

import "firebase/auth";
import { UserVideosList } from "./UserVideosList";

export const UserVideos = ({ currentUser }) => {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		getAllVideosByUserId(currentUser?.id).then(setVideos);
	}, [currentUser]);

	return (
		<div>
			<UserVideosList videos={videos} />
		</div>
	);
};
