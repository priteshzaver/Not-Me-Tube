import { useState } from "react";
import { UserVideoCard } from "../user/UserVideoCard";
import { ExpandedPlaylistDetailsModal } from "./ExpandedPlaylistModal";

export const Playlist = ({ playlist, userPlaylists }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<section className="rounded-md shadow-lg h-[70vh] w-4/5 justify-self-center  overflow-y-scroll">
			<div className="px-6 py-4 bg-white">
				<div className="mb-2 text-xl font-bold">
					<button
						onClick={(event) => {
							event.preventDefault();
							setIsOpen(true);
						}}
					>
						{playlist.name}
					</button>
				</div>
				<ExpandedPlaylistDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} videos={playlist.videos} userPlaylists={userPlaylists}/>
				<p className="text-base text-gray-700">{playlist.description}</p>
				<div className="mt-4">
					<p className="text-base text-gray-700">By {playlist.userProfile.displayName}</p>
				</div>
			</div>
			<div className="flex flex-col items-center">
					{playlist.videos.map((video) => (
						<UserVideoCard key={video.id} video={video} playlist={playlist} userPlaylists={userPlaylists} />
					))}
			</div>
		</section>
	);
};
