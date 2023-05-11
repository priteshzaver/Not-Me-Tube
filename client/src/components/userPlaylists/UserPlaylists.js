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
		<div className="h-full w-full bg-gradient-to-br from-cyan-100 to-blue-300">	
		  <div className="p-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{userPlaylists.map((playlist) => (
			  <Playlist key={playlist.id} playlist={playlist} />
			))}
		  </div>
		</div>
	  );
	};

