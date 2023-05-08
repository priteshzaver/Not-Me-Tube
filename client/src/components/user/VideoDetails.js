import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getVideoDetailsById } from "../../modules/videoManager";

export const VideoDetails = () => {
	const [video, setVideo] = useState({});
	const { id } = useParams();

	useEffect(() => {
		getVideoDetailsById(id).then(setVideo);
	}, []);

	return (
		<article className="flex h-full w-full flex-row">
			<div className="ml-4 h-full w-2/3">
				<section className="h-5/6 w-full">
					<div className="h-5/6 w-full">
						<iframe
							className="video h-full w-full rounded-md"
							src={`https://www.youtube.com/embed/${video.youTubeVideoId}`}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>
					<div className="mt-1 h-1/6 rounded-md border-2 bg-white">
						<h3 className="ml-2 text-3xl font-semibold">{video.title}</h3>
						<div className="flex flex-row">
							<div className="flex flex-col w-2/3">
								<h5>{video.description}</h5>
								<div>{video.userProfile.displayName}</div>
							</div>
							<div className="self-end">{video.dateCreated}</div>
						</div>
					</div>
				</section>
				<section>
					<div>Comments box</div>
				</section>
			</div>
			<section className="h-full">
				<div>Suggested Videos List</div>
			</section>
		</article>
	);
};
