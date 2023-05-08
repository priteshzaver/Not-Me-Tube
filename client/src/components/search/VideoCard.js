import { useState } from "react";
import { SaveToPlaylistModal } from "./SaveToPlaylistModal";
import { saveVideo, saveVideoToAccountAndPlaylist } from "../../modules/videoManager";

export const VideoCard = ({ video }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [savePlaylistVideo, setSavePlaylistVideo] = useState({
		playlistId: 0,
		videoId: 0,
	});
	let videoYouTubeId = "";
	{
		video.id.videoId ? (videoYouTubeId = video.id.videoId) : (videoYouTubeId = video.id);
	}

	const handleSaveVideo = (event) => {
		event.preventDefault();

		const sendVideoToApi = {
			title: video.snippet.title,
			description: video.snippet.description,
			youTubeVideoId: videoYouTubeId,
		};

		saveVideo(sendVideoToApi).then(() => {
			alert("This video was successfully saved to your account!");
		});
	};

	const handleSaveToPlaylist = (event) => {
		event.preventDefault();

		const sendVideoToApi = {
			title: video.snippet.title,
			description: video.snippet.description,
			youTubeVideoId: videoYouTubeId,
		};
		const sendPlaylistVideoToApi = {
			playlistId: savePlaylistVideo.playlistId,
			videoId: 0,
		};

		saveVideoToAccountAndPlaylist(sendVideoToApi, sendPlaylistVideoToApi)
			.then(() => {
				setIsOpen(false);
			})
			.then(() => {
				alert("This video was successfully saved to your playlist!");
			});
	};

	return (
		<div className="px-6 py-4">
			<section className="max-w-sm overflow-hidden rounded shadow-2xl">
				<form>
					{video.id.videoId ? (
						<iframe
							className="video"
							src={`https://www.youtube.com/embed/${video.id.videoId}`}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					) : (
						<iframe
							className="video"
							src={`https://www.youtube.com/embed/${video.id}`}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					)}
					<div className="px-6 py-4">
						<div className="mb-2 text-xl font-bold">{video.snippet.title}</div>
						<div className="text-md mb-2 overflow-hidden truncate">{video.snippet.description}</div>
					</div>
					<button className="btn-primary" onClick={(event) => handleSaveVideo(event)}>
						Save Video
					</button>
					<button
						className="btn-primary"
						onClick={(event) => {
							event.preventDefault();
							setIsOpen(true);
						}}
					>
						Add to Playlist
					</button>
					<SaveToPlaylistModal
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						handleSaveToPlaylist={handleSaveToPlaylist}
						savePlaylistVideo={savePlaylistVideo}
						setSavePlaylistVideo={setSavePlaylistVideo}
					/>
				</form>
			</section>
		</div>
	);
};
