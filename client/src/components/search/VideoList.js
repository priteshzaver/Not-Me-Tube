import { useState } from "react";
import { VideoCard } from "./VideoCard";
import { Pagination } from "../../helpers/Pagination";

export const VideoList = ({ videos }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [videosPerPage] = useState(12);
	let currentVideos = [];
	const indexOfLastVideo = currentPage * videosPerPage;
	const indexOfFirstVideo = indexOfLastVideo - videosPerPage;

	if (videos.length > 12) {
		currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
	}

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<div className="float-left self-center">
				{videos.length > 12 ? <Pagination videosPerPage={videosPerPage} totalVideos={videos.length} paginate={paginate} currentPage={currentPage} /> : ""}
			</div>
			<div className="flex justify-center w-full mt-2">
				<article className="grid grid-cols-4 w-full">
					{currentVideos.map((video) => (
						<>{video.id.videoId ? <VideoCard key={video.id.videoId} video={video} /> : <VideoCard key={video.id} video={video} />}</>
					))}
				</article>
			</div>
		</>
	);
};
