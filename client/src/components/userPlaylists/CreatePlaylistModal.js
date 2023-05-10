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
		return createPlaylist(newPlaylist).then(() => {
			alert("This playlist was successfully created!");
			window.location.reload();
		});
	};

	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
			<div className="fixed inset-0 bg-black/70" aria-hidden="true" />
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
          <Dialog.Title className="text-lg font-medium mb-4">Create New Playlist</Dialog.Title>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium mb-2">Playlist Name:</label>
              <input
                id="name"
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
                className="border border-gray-300 rounded-lg py-2 px-3 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-medium mb-2">Playlist Description:</label>
              <textarea
		required
		placeholder="Playlist Description"
		value={newPlaylist.description}
		onChange={(event) => {
			const copy = { ...newPlaylist };
			copy.description = event.target.value;
			setNewPlaylist(copy);
		}}
		rows={5}
		className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
	/>
            </div>
            <div className="mb-4">
              <input
                id="isPublic"
                type="checkbox"
                checked={newPlaylist.isPublic === true}
                onChange={(event) => {
                  const copy = { ...newPlaylist };
                  copy.isPublic = event.target.checked ? true : false;
                  setNewPlaylist(copy);
                }}
                className="mr-2"
              />
              <label htmlFor="isPublic">Check to make playlist private</label>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button type="submit" onClick={(event) => createPlaylistButton(event)} className="btn-primary mr-2">
                Create
              </button>
              <button type="button" onClick={() => setIsOpen(false)} className="btn-cancel mt-3 w-full sm:w-auto sm:mt-0">
                Cancel
              </button>
            </div>
          </form>
				</div>
			</div>
		</Dialog>
	);
};
