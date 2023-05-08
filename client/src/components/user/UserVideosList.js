import { useState } from "react";
import { Pagination } from "../../helpers/Pagination";
import { UserVideoCard } from "./UserVideoCard";

export const UserVideosList = ({ videos }) => {
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
			<div className="flex justify-center w-full">
				<article className="grid grid-cols-4 w-full">
					{videos.length <= 12 ? videos.map((video) => <UserVideoCard key={video.id} video={video} />) : currentVideos.map((video) => <UserVideoCard key={video.id} video={video} />)}
				</article>
			</div>
		</>
	);
};
