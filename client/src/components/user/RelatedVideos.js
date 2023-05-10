import { useContext, useEffect } from "react";
import { useState } from "react";
import { getRelatedVideos } from "../../modules/youTubeAPIManager";
import { VideoCard } from "../search/VideoCard";
import UserContext from "../../UserContext";
import { getAllPlaylistsByUserId } from "../../modules/playlistManager";

export const RelatedVideos = ({ youTubeVideoId }) => {
	const [videos, setVideos] = useState([]);
	const [userPlaylists, setUserPlaylists] = useState([]);
	const { currentUser } = useContext(UserContext);

	useEffect(() => {
		if (youTubeVideoId) {
			getRelatedVideos(youTubeVideoId).then((data) => {
				setVideos(data.items);
			});
		}
	}, [youTubeVideoId]);

	useEffect(() => {
		if (currentUser) {
			getAllPlaylistsByUserId(currentUser.id).then(setUserPlaylists);
		}
	}, [currentUser]);

	return (
		<>
			{videos?.map((video) => (
				<VideoCard key={video?.id?.videoId} video={video} userPlaylists={userPlaylists} />
			))}
		</>
	);
};




