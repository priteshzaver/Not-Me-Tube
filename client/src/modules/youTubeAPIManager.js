const youTubeApi = "https://youtube.googleapis.com/youtube/v3/";

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

export const search = (criterion) => {
	return fetch(`${youTubeApi}search?part=snippet&q=${criterion}&maxResults=48&order=relevance&key=${apiKey}&type=video`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());
};

export const mostPopularVideosOnYouTube = () => {
	return fetch(`${youTubeApi}videos?part=snippet&chart=mostPopular&maxResults=48&regionCode=US&key=${apiKey}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());
};
