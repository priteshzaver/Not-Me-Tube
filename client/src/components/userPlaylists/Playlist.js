import { useState } from "react";
import { UserVideoCard } from "../user/UserVideoCard";
import { ExpandedPlaylistDetailsModal } from "./ExpandedPlaylistModal";
import { useParams } from "react-router-dom";

export const Playlist = ({ playlist, userPlaylists }) => {
	const [isOpen, setIsOpen] = useState(false);
	const { id } = useParams();
	
	return (
		<section className="h-[70vh] w-4/5 justify-self-center overflow-y-scroll rounded-md  shadow-lg">
			<div className="bg-white px-6 py-4">
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
				<ExpandedPlaylistDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} videos={playlist.videos} userPlaylists={userPlaylists} />
				<p className="text-base text-gray-700">{playlist.description}</p>
				{id == playlist.userProfileId ? (
					""
				) : (
					<div className="mt-4">
						<p className="text-base text-gray-700">By {playlist.userProfile.displayName}</p>
					</div>
				)}
			</div>
			<div className="mt-1 flex flex-col items-center">
				{playlist.videos.map((video) => (
					<UserVideoCard key={video.id} video={video} playlist={playlist} userPlaylists={userPlaylists} />
				))}
			</div>
		</section>
	);
};
