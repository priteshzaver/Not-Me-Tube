import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllPlaylistsByUserId } from "../../modules/playlistManager";
import { Playlist } from "./Playlist";

export const UserPlaylists = () => {
	const [userPlaylists, setUserPlaylists] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		getAllPlaylistsByUserId(id).then(setUserPlaylists);
	}, []);

	return (
		<>
			<article>
				{userPlaylists.map((playlist) => (
					<Playlist key={playlist.id} playlist={playlist} />
				))}
			</article>
		</>
	);
};
