import { useContext, useEffect, useState } from "react";
import UserContext from "../../UserContext";
import { getAllPlaylists, getAllPlaylistsByUserId } from "../../modules/playlistManager";
import { Playlist } from "./Playlist";

export const ExplorePlaylists = () => {
	const { currentUser } = useContext(UserContext);
	const [allPlaylists, setAllPlaylists] = useState([]);
	const [filteredPlaylists, setFilteredPlaylists] = useState([]);
	const [userPlaylists, setUserPlaylists] = useState([]);

	useEffect(() => {
		getAllPlaylists().then((data) => setAllPlaylists(data));
	}, []);

	useEffect(() => {
		if(currentUser) {
			const otherPlaylists = allPlaylists.filter((playlist) => playlist.userProfileId !== currentUser.id);
			setFilteredPlaylists(otherPlaylists);
		}
	}, [currentUser, allPlaylists]);

	useEffect(() => {
		if (currentUser) {
			getAllPlaylistsByUserId(currentUser.id).then(setUserPlaylists);
		}
	}, [currentUser]);

	return (
		<div className="h-full w-full bg-gradient-to-br from-cyan-100 to-blue-300">
			<article className="p-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{filteredPlaylists.map((playlist) => (
					<Playlist key={playlist?.id} playlist={playlist} userPlaylists={userPlaylists} />
				))}
			</article>
		</div>
	);
};
