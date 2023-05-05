import { useState } from "react";
import { VideoList } from "./VideoList";
import { search } from "../../modules/youTubeAPIManager";

export const SearchBar = () => {
	const [criterion, setCriterion] = useState("");
	const [videos, setVideos] = useState([]);

	const searchSubmit = (event) => {
		event.preventDefault();
		search(criterion).then((data) => setVideos(data.items));
	};

	return (
		<>
			<div>
				<form onSubmit={searchSubmit}>
					<fieldset>
						<input
							type="text"
							placeholder="searchterms"
							onChange={(event) => {
								setCriterion(event.target.value);
							}}
						/>
					</fieldset>
					<fieldset>
						<button type="submit">Search</button>
					</fieldset>
				</form>
			</div>
			{videos ? (
				<div>
					<VideoList videos={videos} />
				</div>
			) : (
				""
			)}
		</>
	);
};
