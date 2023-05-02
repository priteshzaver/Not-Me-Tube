import { useState } from "react";
import { VideoCard } from "./VideoCard";
import { Pagination } from "../../helpers/Pagination";

export const VideoList = ({ videos }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [videosPerPage] = useState(12);

	const indexOfLastVideo = currentPage * videosPerPage;
	const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
	const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className="flex justify-center">
			<article className="grid grid-cols-3 gap-3">
				{currentVideos.map((video) => (
					<VideoCard key={video.id.videoId} video={video} />
				))}
				<div>
					{videos.length > 12 ? (
						<Pagination
							videosPerPage={videosPerPage}
							totalVideos={videos.length}
							paginate={paginate}
							currentPage={currentPage}
						/>
					) : (
						""
					)}
				</div>
			</article>
		</div>
	);
};

// {currentVideos.map((video) => (
//   <VideoCard key={video.id.videoId} video={video} />
// ))}
// <div>
//   {videos.length > 12 ? (
//     <Pagination
//       videosPerPage={videosPerPage}
//       totalVideos={videos.length}
//       paginate={paginate}
//       currentPage={currentPage}
//     />
//   ) : (
//     ""
//   )}
// </div>

// const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
// 	const currentUserVideos = userVideos.slice(
// 		indexOfFirstVideo,
// 		indexOfLastVideo
// 	);
