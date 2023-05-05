import { useEffect, useState } from "react";
import { mostPopularVideosOnYouTube } from "../../modules/youTubeAPIManager";
import { VideoList } from "../search/VideoList";

export const YouTubePopularVideos = () => {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		mostPopularVideosOnYouTube().then((data) => setVideos(data.items));
	}, []);

	return (
		<>
			{videos ? (
				<div>
					<VideoList videos={videos} />
				</div>
			) : (
				""
			)}
		</>
	);
};
