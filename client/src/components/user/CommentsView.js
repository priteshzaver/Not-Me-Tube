import { useState, useEffect, useCallback } from "react";
import { AddAComment } from "./AddAComment";
import { CommentsList } from "./CommentsList";
import { getCommentsByVideoId, saveComment } from "../../modules/commentsManager";

export const CommentsView = ({ id }) => {
	const [videoComments, setVideosComments] = useState([]);

	useEffect(() => {
		getCommentsByVideoId(id).then(setVideosComments);
	}, [id]);

	const handleAddComment = useCallback(
		(newComment) => {
			saveComment(newComment).then(() => {
				getCommentsByVideoId(id).then(setVideosComments);
			});
		},
		[id]
	);

	return (
		<>
			<div className="h-1/6 flex items-center mb-3">
				<AddAComment id={id} handleAddComment={handleAddComment} />
			</div>
			<div className="h-4/5 overflow-y-auto">
				<CommentsList videoComments={videoComments} setVideosComments={setVideosComments} />
			</div>
		</>
	);
};