import { useContext, useEffect, useState } from "react";
import UserContext from "../../UserContext";
import { getAllPlaylistsByUserId } from "../../modules/playlistManager";
import { Dialog } from "@headlessui/react";

export const SaveToPlaylistModal = ({ isOpen, setIsOpen, handleSaveToPlaylist, savePlaylistVideo, setSavePlaylistVideo }) => {
	const { currentUser } = useContext(UserContext);
	const [userPlaylists, setUserPlaylists] = useState([]);

	useEffect(() => {
		getAllPlaylistsByUserId(currentUser?.id).then(setUserPlaylists);
	}, [currentUser]);

	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
			<div className="fixed inset-0 bg-black/70" aria-hidden="true" />
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<div className="flex h-1/3 w-1/6 flex-col justify-center rounded-xl bg-white p-8">
					<Dialog.Panel>
						<Dialog.Title className="text-3xl">Save to:</Dialog.Title>
						<form>
							<div className="my-4 grid place-content-center">
								<fieldset>
									{userPlaylists.map((playlist) => {
										return (
											<label key={playlist.id} className="mb-4 flex items-center text-xl">
												<input
													type="radio"
													name="playlist"
													value={playlist.id}
													checked={savePlaylistVideo.playlistId === playlist.id}
													onChange={(event) => {
														const copy = { ...savePlaylistVideo };
														copy.playlistId = parseInt(event.target.value);
														setSavePlaylistVideo(copy);
													}}
													className="mr-4"
												/>
												<span>{playlist.name}</span>
											</label>
										);
									})}
								</fieldset>
							</div>
							<button className="btn-primary" onClick={(event) => handleSaveToPlaylist(event)}>
								Save
							</button>
							<button className="btn-cancel float-right" onClick={() => setIsOpen(false)}>
								Cancel
							</button>
						</form>
					</Dialog.Panel>
				</div>
			</div>
		</Dialog>
	);
};
