import { getToken } from "./authManager";

const commentApi = "/api/comment"

export const getCommentsByVideoId = (id) => {
    return getToken().then((token) => {
		return fetch(`${commentApi}/video/${id}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => res.json());
	});
}
export const saveComment = (comment) => {
	return getToken().then((token) => {
		return fetch(`${commentApi}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(comment),
		}).then((resp) => resp.json());
	});
};
export const updateComment = (commentObj) => {
    return getToken().then((token) => {
		return fetch(`${commentApi}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: commentObj.id,
				message: commentObj.message,
                videoId: commentObj.videoId,
				userProfileId: commentObj.userProfileId,
                createDateTime: commentObj.createDateTime
			}),
		});
	});
}
export const deleteComment = (id) => {
	return getToken().then((token) => {
		return fetch(`${commentApi}/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	});
};