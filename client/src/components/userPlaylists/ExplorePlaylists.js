import { useContext, useEffect, useState } from "react";
import UserContext from "../../UserContext";
import { getAllPlaylists } from "../../modules/playlistManager";
import { Playlist } from "./Playlist";

export const ExplorePlaylists = () => {
	const { currentUser } = useContext(UserContext);
	const [allPlaylists, setAllPlaylists] = useState([]);
	const [filteredPlaylists, setFilteredPlaylists] = useState([]);

	useEffect(() => {
		getAllPlaylists().then((data) => setAllPlaylists(data));
	}, []);
	useEffect(() => {
		const otherPlaylists = allPlaylists.filter(
			(playlist) => playlist.userProfileId !== currentUser.id
		);
		setFilteredPlaylists(otherPlaylists);
	}, [allPlaylists]);

	return (
		<article className="grid grid-cols-3">
			{filteredPlaylists.map((playlist) => (
				<Playlist key={playlist.id} playlist={playlist} />
			))}
		</article>
	);
};