import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllPlaylistsByUserId } from "../../modules/playlistManager";
import { Playlist } from "./Playlist";
import { CreatePlaylistModal } from "./CreatePlaylistModal";

export const UserPlaylists = () => {
	const [userPlaylists, setUserPlaylists] = useState([]);
	const { id } = useParams();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		getAllPlaylistsByUserId(id).then(setUserPlaylists);
	}, []);

	return (
		<div className="h-full w-full bg-gradient-to-br from-cyan-100 to-blue-300">
		  <div className="flex items-center justify-between px-4 py-2">
			<button
			  className="btn-primary px-4 py-2 rounded-md text-white font-medium"
			  onClick={() => setIsOpen(true)}
			>
			  Create Playlist
			</button>
			<CreatePlaylistModal isOpen={isOpen} setIsOpen={setIsOpen} />
		  </div>
	
		  <div className="p-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{userPlaylists.map((playlist) => (
			  <Playlist key={playlist.id} playlist={playlist} />
			))}
		  </div>
		</div>
	  );
	};

