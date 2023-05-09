import { useState } from "react";
import { search } from "../../modules/youTubeAPIManager";
import { useNavigate } from "react-router-dom";

export const SearchBar = ({ setVideos }) => {
	const [criterion, setCriterion] = useState("");
	const navigate = useNavigate();
	const searchSubmit = (event) => {
		event.preventDefault();
		search(criterion)
			.then((data) => setVideos(data.items))
			.then(() => {
				navigate("/searchResults");
			});
	};

	return (
		<>
			<div className="flex w-full items-center justify-center lg:w-auto lg:justify-start">
				<form onSubmit={searchSubmit} className="flex w-full items-center justify-center lg:w-1/2 lg:justify-start">
					<fieldset className="w-2/3">
						<input
							type="text"
							placeholder="Search Terms"
							onChange={(event) => {
								setCriterion(event.target.value);
							}}
							className="w-full rounded-3xl border border-gray-400 px-4 py-2 focus:border-blue-400 focus:outline-none"
						/>
					</fieldset>
					<fieldset>
						<button type="submit" className="btn-primary">
							Search
						</button>
					</fieldset>
				</form>
			</div>
		</>
	);
};
