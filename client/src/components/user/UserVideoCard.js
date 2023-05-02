export const UserVideoCard = ({ video }) => {
	return (
		<section className="max-w-sm overflow-hidden rounded shadow-2xl">
			<iframe
				className="video"
				src={`https://www.youtube.com/embed/${video.youTubeVideoId}`}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
			<div className="px-6 py-4">
				<div className="mb-2 text-xl font-bold">{video.title}</div>
			</div>
			<button className="btn-primary">Add to Playlist</button>
		</section>
	);
};
