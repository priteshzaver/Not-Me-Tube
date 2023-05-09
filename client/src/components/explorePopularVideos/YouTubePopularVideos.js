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
				<div className="flex w-full h-full bg-gradient-to-br from-cyan-100 to-blue-300">
					<VideoList videos={videos} />
				</div>
			) : (
				""
			)}
		</>
	);
};
