import { useContext, useEffect, useState } from "react";
import { getAllVideosByUserId } from "../../modules/videoManager";
import "firebase/auth";
import { UserVideosList } from "./UserVideosList";
import UserContext from "../../UserContext";
import { getAllPlaylistsByUserId } from "../../modules/playlistManager";

export const UserVideos = () => {
	const [videos, setVideos] = useState([]);
	const { currentUser } = useContext(UserContext);
	const [userPlaylists, setUserPlaylists] = useState([]);

	useEffect(() => {
		if (currentUser) {
			getAllVideosByUserId(currentUser.id)
				.then((videosObj) => {
					setVideos(videosObj);
				})
				.then(getAllPlaylistsByUserId(currentUser.id).then(setUserPlaylists));
		}
	}, [currentUser]);

	return (
		<div className="flex h-full w-full bg-gradient-to-br from-cyan-100 to-blue-300">
			<UserVideosList videos={videos} userPlaylists={userPlaylists} />
		</div>
	);
};
