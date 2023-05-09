import { useEffect } from "react";
import { useState } from "react";
import { getRelatedVideos } from "../../modules/youTubeAPIManager";
import { VideoCard } from "../search/VideoCard";

export const RelatedVideos = ({ youTubeVideoId }) => {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		if (youTubeVideoId) {
			getRelatedVideos(youTubeVideoId).then((data) => {
				setVideos(data.items);
			});
		}
	}, [youTubeVideoId]);

	return (
		<>
			{videos?.map((video) => (
				<VideoCard key={video?.id?.videoId} video={video} />
			))}
		</>
	);
};




