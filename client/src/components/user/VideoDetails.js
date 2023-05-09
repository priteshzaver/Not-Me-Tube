import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getVideoDetailsById } from "../../modules/videoManager";
import { CommentsView } from "./CommentsView";
import { RelatedVideos } from "./RelatedVideos";

export const VideoDetails = () => {
	const [video, setVideo] = useState({});
	const { id } = useParams();

	useEffect(() => {
		getVideoDetailsById(id).then(setVideo);
	}, []);

	return (
		<article className="flex h-full w-full flex-row bg-gradient-to-br from-cyan-100 to-blue-300">
			<div className="ml-2 h-full w-5/6 pt-2">
				<section className="h-3/4 w-full">
					<div className="h-[85%] w-full">
						<iframe
							className="video h-full w-full rounded-md"
							src={`https://www.youtube.com/embed/${video.youTubeVideoId}`}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>
					<div className="mt-2 h-fit rounded-md bg-emerald-100">
						<h3 className="ml-2 text-3xl font-semibold">{video.title}</h3>
						<div className="flex flex-row">
							<div className="flex w-2/3 flex-col">
								<h5>{video.description}</h5>
								<div>{video.userProfile?.displayName}</div>
							</div>
						</div>
					</div>
				</section>
				<section className="h-1/4">
					<CommentsView id={id} />
				</section>
			</div>
			<section className="h-screen w-1/3 overflow-y-scroll grid grid-cols-1 justify-items-center pt-2">
				<RelatedVideos youTubeVideoId={video.youTubeVideoId} />
			</section>
		</article>
	);
};
