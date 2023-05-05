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

export const saveVideo = (video) => {
	return getToken().then((token) => {
		return fetch(`${videoDatabaseUrl}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(video),
		}).then((resp) => resp.json());
	});
};

export const saveVideoToPlaylist = (video, playlistVideo) => {
	return getToken().then((token) => {
		return fetch(`${videoDatabaseUrl}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(video),
		})
			.then((resp) => resp.json())
			.then((savedVideo) => {
				playlistVideo.videoId = savedVideo.id;
				return fetch(`${videoDatabaseUrl}/saveToPlaylist`, {
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(playlistVideo),
				});
			})
			.then((resp) => resp.json());
	});
};

export const deleteVideoFromPlaylist = (playlistVideo) => {
	return getToken().then((token) => {
		return fetch(`${videoDatabaseUrl}/deleteVideoFromPlaylist`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(playlistVideo),
		});
	});
};

export const deleteVideoFromAccount = (id) => {
	return getToken().then((token) => {
		return fetch(`${videoDatabaseUrl}/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	});
};
