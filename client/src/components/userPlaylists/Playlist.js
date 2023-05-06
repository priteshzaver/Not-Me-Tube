import { useState } from "react";
import { UserVideoCard } from "../user/UserVideoCard";
import { ExpandedPlaylistDetailsModal } from "./ExpandedPlaylistModal";

export const Playlist = ({ playlist }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<section className="max-w-sm overflow-hidden rounded shadow-lg">
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
				<ExpandedPlaylistDetailsModal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					videos={playlist.videos}
				/>
				<p className="text-base text-gray-700">{playlist.description}</p>
				<div className="mt-4">
					<p className="text-base text-gray-700">By {playlist.userProfileId}</p>
				</div>
			</div>
			<div className=" border-t border-gray-200">
				<div className="max-h-96 divide-y divide-gray-200 overflow-y-auto bg-gray-100">
					{playlist.videos.map((video) => (
						<UserVideoCard key={video.id} video={video} playlist={playlist} />
					))}
				</div>
			</div>
		</section>
	);
};
