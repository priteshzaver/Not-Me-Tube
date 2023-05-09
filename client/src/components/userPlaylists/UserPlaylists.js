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
			<div className="mt-2">
				<button className="btn-primary h-min" onClick={() => setIsOpen(true)}>
					Create a new playlist
				</button>
				<CreatePlaylistModal isOpen={isOpen} setIsOpen={setIsOpen} />
			</div>

			<article className="grid grid-cols-3 gap-y-4 h-[calc(170vh)]">
				{userPlaylists.map((playlist) => (
					<Playlist key={playlist.id} playlist={playlist} />
				))}
			</article>
		</div>
	);
};
