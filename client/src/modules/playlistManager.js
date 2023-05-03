import { getToken } from "./authManager";

const playlistApiUrl = "/api/playlist";

export const getAllPlaylistsByUserId = (userId) => {
	return getToken().then((token) => {
		return fetch(`${playlistApiUrl}/${userId}/playlists`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => res.json());
	});
};

export const createPlaylist = (playlist) => {
	return getToken().then((token) => {
		return fetch(`${playlistApiUrl}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(playlist),
		}).then((resp) => {
			if (resp.ok) {
				console.log("Post made successfully!");
				return resp.json();
			} else {
				throw new Error("An error occurred while trying to add a playlist.");
			}
		});
	});
};

export const editPlaylist = (playlistObj) => {
	return getToken().then((token) => {
		return fetch(`${playlistApiUrl}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: playlistObj.id,
				name: playlistObj.name,
				description: playlistObj.description,
				userProfileId: playlistObj.userProfileId,
				isPublic: playlistObj.isPublic,
			}),
		});
	});
};

export const deletePlaylist = (playlistId) => {
	return getToken().then((token) => {
		return fetch(`${playlistApiUrl}/${playlistId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	});
};
