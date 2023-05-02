import { useEffect, useState } from "react";
import { Pagination } from "../../helpers/Pagination";
import { UserVideoCard } from "./UserVideoCard";

export const UserVideosList = ({ videos }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [videosPerPage] = useState(12);
	const [currentVideos, setCurrentVideos] = useState([]);
	const indexOfLastVideo = currentPage * videosPerPage;
	const indexOfFirstVideo = indexOfLastVideo - videosPerPage;

	useEffect(() => {
		if (videos > 12) {
			setCurrentVideos(videos.slice(indexOfFirstVideo, indexOfLastVideo));
		}
	}, []);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className="flex justify-center">
			<article className="grid grid-cols-3 gap-3">
				{videos.length < 12
					? videos.map((video) => (
							<UserVideoCard key={video.id} video={video} />
					  ))
					: currentVideos.map((video) => (
							<UserVideoCard key={video.id} video={video} />
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

// const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
// {currentVideos.map((video) => (
//     <UserVideoCard key={video.id} video={video} />
// ))}
