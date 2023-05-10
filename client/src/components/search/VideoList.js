import { useState } from "react";
import { VideoCard } from "./VideoCard";
import { Pagination } from "../../helpers/Pagination";
import { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../../UserContext";
import { getAllPlaylistsByUserId } from "../../modules/playlistManager";
import { useLocation } from "react-router-dom";

export const VideoList = ({ videos }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [videosPerPage] = useState(12);
	let currentVideos = [];
	const indexOfLastVideo = currentPage * videosPerPage;
	const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
	const [userPlaylists, setUserPlaylists] = useState([]);
	const { currentUser } = useContext(UserContext);
	const location = useLocation();

	if (videos.length > 12) {
		currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
	}
	useEffect(() => {
		if (currentUser) {
			getAllPlaylistsByUserId(currentUser.id).then(setUserPlaylists);
		}
	}, [currentUser]);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			{location.pathname === "/searchResults" ? (
				<div className="flex h-full w-full bg-gradient-to-br from-cyan-100 to-blue-300">
					<div className="float-left self-center">
						{videos.length > 12 ? <Pagination videosPerPage={videosPerPage} totalVideos={videos.length} paginate={paginate} currentPage={currentPage} /> : ""}
					</div>
					<div className="mt-2 flex w-full justify-center">
						<article className="grid w-full grid-cols-4">
							{currentVideos.map((video) => (
								<>
									{video.id.videoId ? (
										<VideoCard key={video.id.videoId} video={video} userPlaylists={userPlaylists} />
									) : (
										<VideoCard key={video.id} video={video} userPlaylists={userPlaylists} />
									)}
								</>
							))}
						</article>
					</div>
				</div>
			) : (
				<>
					<div className="float-left self-center">
						{videos.length > 12 ? <Pagination videosPerPage={videosPerPage} totalVideos={videos.length} paginate={paginate} currentPage={currentPage} /> : ""}
					</div>
					<div className="mt-2 flex w-full justify-center">
						<article className="grid w-full grid-cols-4">
							{currentVideos.map((video) => (
								<>
									{video.id.videoId ? (
										<VideoCard key={video.id.videoId} video={video} userPlaylists={userPlaylists} />
									) : (
										<VideoCard key={video.id} video={video} userPlaylists={userPlaylists} />
									)}
								</>
							))}
						</article>
					</div>
				</>
			)}
		</>
	);
};
