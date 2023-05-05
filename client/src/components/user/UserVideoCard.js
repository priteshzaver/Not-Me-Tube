import { useContext } from "react";
import { useLocation } from "react-router";
import UserContext from "../../UserContext";
import {
	deleteVideoFromAccount,
	deleteVideoFromPlaylist,
} from "../../modules/videoManager";

export const UserVideoCard = ({ video, playlist }) => {
	const location = useLocation();
	const { currentUser } = useContext(UserContext);

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
			<button className="btn-primary">Add to Playlist</button>
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
				<button
					className="btn-primary"
					onClick={() => {
						handleDeleteFromAccount();
					}}
				>
					Delete From Account
				</button>
			) : (
				""
			)}
		</section>
	);
};
