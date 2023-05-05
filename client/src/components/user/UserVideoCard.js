import { useContext, useState } from "react";
import { useLocation } from "react-router";
import UserContext from "../../UserContext";
import {
	deleteVideoFromAccount,
	deleteVideoFromPlaylist,
	saveVideoToPlaylist,
} from "../../modules/videoManager";
import { SaveToPlaylistModal } from "../search/SaveToPlaylistModal";

export const UserVideoCard = ({ video, playlist }) => {
	const location = useLocation();
	const { currentUser } = useContext(UserContext);
	const [isOpen, setIsOpen] = useState(false);
	const [savePlaylistVideo, setSavePlaylistVideo] = useState({
		playlistId: 0,
		videoId: video.id,
	});
	const handleDeleteFromPlaylist = () => {
		if (
			window.confirm(
				"Are you sure you want to delete this video from the playlist?"
			)
		) {
			const sendDeleteToApi = {
				playlistId: playlist.id,
				videoId: video.id,
			};
			deleteVideoFromPlaylist(sendDeleteToApi).then(() => {
				alert("This video was successfully deleted from your playlist!");
				window.location.reload();
			});
		}
	};

	const handleDeleteFromAccount = () => {
		if (
			window.confirm(
				"Are you sure you want to delete this video from your account? It will also delete the video from any associated playlists."
			)
		) {
			deleteVideoFromAccount(video.id).then(() => {
				alert("This video was successfully deleted from your account!");
				window.location.reload();
			});
		}
	};
	const handleSaveToPlaylist = (event) => {
		event.preventDefault();

		saveVideoToPlaylist(savePlaylistVideo)
			.then(() => {
				setIsOpen(false);
			})
			.then(() => {
				alert("This video was successfully saved to your playlist!");
			});
	};

	return (
		<section className="max-w-sm overflow-hidden rounded shadow-2xl">
			<iframe
				className="video"
				src={`https://www.youtube.com/embed/${video.youTubeVideoId}`}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
			<div className="px-6 py-4">
				<div className="mb-2 text-xl font-bold">{video.title}</div>
				<div className="text-md mb-2">{video.description}</div>
			</div>

			{location.pathname === `/userPlaylists/${currentUser?.id}` ? (
				<button
					className="btn-primary"
					onClick={() => {
						handleDeleteFromPlaylist();
					}}
				>
					Delete from Playlist
				</button>
			) : (
				""
			)}
			{location.pathname === "/" ? (
				<>
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
					<button
						className="btn-primary"
						onClick={() => {
							handleDeleteFromAccount();
						}}
					>
						Delete From Account
					</button>
				</>
			) : (
				""
			)}
		</section>
	);
};
