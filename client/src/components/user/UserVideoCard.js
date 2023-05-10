import { useContext, useState } from "react";
import { useLocation } from "react-router";
import UserContext from "../../UserContext";
import { deleteVideoFromAccount, deleteVideoFromPlaylist, saveVideoToPlaylist } from "../../modules/videoManager";
import { SaveToPlaylistModal } from "../search/SaveToPlaylistModal";
import { DeleteFromAccountModal } from "./DeleteFromAccountModal";

export const UserVideoCard = ({ video, playlist, userPlaylists }) => {
	const location = useLocation();
	const { currentUser } = useContext(UserContext);
	const [isOpenPlaylist, setIsOpenPlaylist] = useState(false);
	const [isOpenDeleteFromAccount, setIsOpenDeleteFromAccount] = useState(false);
	const [savePlaylistVideo, setSavePlaylistVideo] = useState({
		playlistId: 0,
		videoId: video.id,
	});
	const handleDeleteFromPlaylist = () => {
		if (window.confirm("Are you sure you want to delete this video from the playlist?")) {
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
		deleteVideoFromAccount(video.id).then(() => {
			alert("This video was successfully deleted from your account!");
			window.location.reload();
		});
	};

	const handleSaveToPlaylist = (event) => {
		event.preventDefault();

		saveVideoToPlaylist(savePlaylistVideo)
			.then(() => {
				setIsOpenPlaylist(false);
			})
			.then(() => {
				alert("This video was successfully saved to your playlist!");
			});
	};
	return (
		<>
			<section className="mb-2 h-96 w-96 max-w-sm overflow-hidden rounded-md border-2 border-green-300 bg-white px-2 py-2">
				<div className="mt-1 flex justify-center">
					<iframe
						className="video rounded-md"
						src={`https://www.youtube.com/embed/${video.youTubeVideoId}`}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				</div>
				<div className="h-2/5 px-6 py-4">
					<div className="mb-2 overflow-hidden text-xl font-bold">
						<a href={`/videoDetails/${video.id}`}>{video.title}</a>
					</div>
					<div className="text-md overflow-hidden truncate">{video.description}</div>
				</div>
				{location.pathname === `/userPlaylists/${currentUser?.id}` ? (
					<button
						className="btn-delete"
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
								setIsOpenPlaylist(true);
							}}
						>
							Add to Playlist
						</button>
						<SaveToPlaylistModal
							isOpen={isOpenPlaylist}
							setIsOpen={setIsOpenPlaylist}
							handleSaveToPlaylist={handleSaveToPlaylist}
							savePlaylistVideo={savePlaylistVideo}
							setSavePlaylistVideo={setSavePlaylistVideo}
							userPlaylists={userPlaylists}
						/>
						<button
							className="btn-delete"
							onClick={(event) => {
								event.preventDefault();
								setIsOpenDeleteFromAccount(true);
							}}
						>
							Delete From Account
						</button>
						<DeleteFromAccountModal
							isOpenDeleteFromAccount={isOpenDeleteFromAccount}
							setIsOpenDeleteFromAccount={setIsOpenDeleteFromAccount}
							handleDeleteFromAccount={handleDeleteFromAccount}
						/>
					</>
				) : (
					""
				)}
				{location.pathname === "/explorePlaylists" ? (
					<>
						<button
							className="btn-primary"
							onClick={(event) => {
								event.preventDefault();
								setIsOpenPlaylist(true);
							}}
						>
							Add to Playlist
						</button>
						<SaveToPlaylistModal
							isOpen={isOpenPlaylist}
							setIsOpen={setIsOpenPlaylist}
							handleSaveToPlaylist={handleSaveToPlaylist}
							savePlaylistVideo={savePlaylistVideo}
							setSavePlaylistVideo={setSavePlaylistVideo}
							userPlaylists={userPlaylists}
						/>
					</>
				) : (
					""
				)}
			</section>
		</>
	);
};
