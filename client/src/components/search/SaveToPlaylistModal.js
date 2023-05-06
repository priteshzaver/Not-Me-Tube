import { useContext, useEffect, useState } from "react";
import UserContext from "../../UserContext";
import { getAllPlaylistsByUserId } from "../../modules/playlistManager";
import { Dialog } from "@headlessui/react";

export const SaveToPlaylistModal = ({
	isOpen,
	setIsOpen,
	handleSaveToPlaylist,
	savePlaylistVideo,
	setSavePlaylistVideo,
}) => {
	const { currentUser } = useContext(UserContext);
	const [userPlaylists, setUserPlaylists] = useState([]);

	useEffect(() => {
		getAllPlaylistsByUserId(currentUser?.id).then(setUserPlaylists);
	}, [currentUser]);

	return (
		<Dialog
			open={isOpen}
			onClose={() => setIsOpen(false)}
			className="relative z-50"
		>
			<div className="fixed inset-0 bg-black/70" aria-hidden="true" />
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<div className="bg-white p-8">
					<Dialog.Panel>
						<Dialog.Title>Save to:</Dialog.Title>
						<form>
							<fieldset>
								<select
									onChange={(event) => {
										const copy = { ...savePlaylistVideo };
										copy.playlistId = parseInt(event.target.value);
										setSavePlaylistVideo(copy);
									}}
								>
									<option value="0">Choose Playlist</option>
									{userPlaylists.map((playlist) => {
										return <option value={playlist.id}>{playlist.name}</option>;
									})}
								</select>
							</fieldset>
							<button
								className="btn-primary"
								onClick={(event) => handleSaveToPlaylist(event)}
							>
								Save
							</button>
							<button
								className="btn-cancel float-right"
								onClick={() => setIsOpen(false)}
							>
								Cancel
							</button>
						</form>
					</Dialog.Panel>
				</div>
			</div>
		</Dialog>
	);
};
