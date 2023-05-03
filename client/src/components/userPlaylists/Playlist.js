import { UserVideoCard } from "../user/UserVideoCard";

export const Playlist = ({ playlist }) => {
	return (
		<section>
			<div>{playlist.name}</div>
			<div>{playlist.description}</div>
			<div className="grid grid-cols-1">
				{playlist.videos.map((video) => (
					<UserVideoCard key={video.id} video={video} />
				))}
			</div>
		</section>
	);
};
