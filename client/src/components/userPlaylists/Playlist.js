import { useState } from "react";
import { UserVideoCard } from "../user/UserVideoCard";
import { ExpandedPlaylistDetailsModal } from "./ExpandedPlaylistModal";

export const Playlist = ({ playlist }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<section className="rounded-md shadow-lg w-4/5 justify-self-center bg-white overflow-auto">
			<div className="px-6 py-4">
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
				<ExpandedPlaylistDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} videos={playlist.videos} />
				<p className="text-base text-gray-700">{playlist.description}</p>
				<div className="mt-4">
					<p className="text-base text-gray-700">By {playlist.userProfileId}</p>
				</div>
			</div>
			<div className="flex flex-col items-center">
					{playlist.videos.map((video) => (
						<UserVideoCard key={video.id} video={video} playlist={playlist} />
					))}
			</div>
		</section>
	);
};
