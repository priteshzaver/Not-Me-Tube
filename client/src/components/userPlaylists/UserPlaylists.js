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
		<>
			<button className="btn-primary h-min" onClick={() => setIsOpen(true)}>
				Create a new playlist
			</button>
			<CreatePlaylistModal isOpen={isOpen} setIsOpen={setIsOpen} />
			<article className="grid grid-cols-3 gap-x-0 sm:gap-x-20">
				{userPlaylists.map((playlist) => (
					<Playlist key={playlist.id} playlist={playlist} />
				))}
			</article>
		</>
	);
};
