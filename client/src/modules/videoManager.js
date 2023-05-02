import { getToken } from "./authManager";

const videoDatabaseUrl = "/api/video";
const videoYoutubeUrl =
	"https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=";

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

export const search = (criterion) => {
	return fetch(
		`${videoYoutubeUrl}${criterion}&maxResults=48&order=relevance&key=${apiKey}&type=video`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	).then((res) => res.json());
};

export const getAllVideosByUserId = (userId) => {
	return getToken().then((token) => {
		return fetch(`${videoDatabaseUrl}/${userId}/videos`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => res.json());
	});
};
