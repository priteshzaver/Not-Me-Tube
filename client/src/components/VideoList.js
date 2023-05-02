import { useEffect, useState } from "react";
import { VideoCard } from "./VideoCard";
import { Pagination } from "./Pagination";

export const VideoList = ({ videos, userVideos }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [videosPerPage] = useState(12);

	const indexOfLastVideo = currentPage * videosPerPage;
	const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
	const [currentVideos, setCurrentVideos] = useState([]);
	const [currentUserVideos, setCurrentUserVideos] = useState([]);

	useEffect(() => {
		if (videos && videos > 12) {
			setCurrentVideos(videos.slice(indexOfFirstVideo, indexOfLastVideo));
		} else if (userVideos && videos > 12) {
			setCurrentUserVideos(
				userVideos.slice(indexOfFirstVideo, indexOfLastVideo)
			);
		} else if (videos) {
			setCurrentVideos(videos);
		} else if (userVideos) {
			setCurrentUserVideos(userVideos);
		}
	}, []);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className="flex justify-center">
			<div>VideoList</div>
			<article className="grid grid-cols-3 gap-3">
				{currentVideos?.length > 0 ? (
					<>
						{currentVideos.map((video) => (
							<VideoCard key={video?.id?.videoId} video={video} />
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
					</>
				) : (
					<>
						{currentUserVideos.map((userVideo) => (
							<VideoCard key={userVideo?.id} userVideo={userVideo} />
						))}
						<div>
							{userVideos.length > 12 ? (
								<Pagination
									videosPerPage={videosPerPage}
									totalVideos={userVideos?.length}
									paginate={paginate}
									currentPage={currentPage}
								/>
							) : (
								""
							)}
						</div>
					</>
				)}
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
