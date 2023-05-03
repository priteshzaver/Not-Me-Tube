import { useState } from "react";
import { useParams } from "react-router-dom";
import { createPlaylist } from "../../modules/playlistManager";
import { Dialog } from "@headlessui/react";

export const CreatePlaylistModal = ({ isOpen, setIsOpen }) => {
	const { id } = useParams();

	const [newPlaylist, setNewPlaylist] = useState({
		name: "",
		description: "",
		userProfileId: id,
		isPublic: false,
	});

	const createPlaylistButton = (event) => {
		event.preventDefault();
		return createPlaylist(newPlaylist).then(() => setIsOpen(false));
	};

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
						<Dialog.Title>Create New Playlist</Dialog.Title>
						<form>
							<fieldset>
								<label>Playlist Name:</label>
								<input
									required
									autoFocus
									type="text"
									placeholder="Playlist Name"
									value={newPlaylist.name}
									onChange={(event) => {
										const copy = { ...newPlaylist };
										copy.name = event.target.value;
										setNewPlaylist(copy);
									}}
								/>
							</fieldset>
							<fieldset>
								<label>Playlist Desciption:</label>
								<input
									required
									type="text"
									placeholder="Playlist Desciption"
									value={newPlaylist.description}
									onChange={(event) => {
										const copy = { ...newPlaylist };
										copy.description = event.target.value;
										setNewPlaylist(copy);
									}}
								/>
							</fieldset>
							<fieldset>
								<label>Check to make playlist private </label>
								<input
									type="checkbox"
									checked={newPlaylist.isPublic === true}
									onChange={(event) => {
										const copy = { ...newPlaylist };
										copy.isPublic = event.target.checked ? true : false;
										setNewPlaylist(copy);
									}}
								/>
							</fieldset>
							<button
								className="btn-primary"
								onClick={(event) => createPlaylistButton(event)}
							>
								Create
							</button>
							<button
								className="btn-primary float-right"
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
