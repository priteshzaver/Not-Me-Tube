import { getToken } from "./authManager";

const videoDatabaseUrl = "/api/video";

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

export const getVideoDetailsById = (id) => {
	return getToken().then((token) => {
		return fetch(`${videoDatabaseUrl}/${id}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => res.json());
	});
}

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

export const saveVideoToPlaylist = (playlistVideo) => {
	return getToken()
		.then((token) => {
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
};

export const saveVideoToAccountAndPlaylist = (video, playlistVideo) => {
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

export const getVideosByPlaylistId = (playlistId) => {
	return getToken().then((token) => {
		return fetch(`${videoDatabaseUrl}/playlist/${playlistId}/videos`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => res.json());
	});
};
