import React, { useContext, useCallback, useState } from "react";
import UserContext from "../../UserContext";
import { deleteComment, updateComment } from "../../modules/commentsManager";

export const CommentsList = React.memo(({ videoComments, setVideosComments }) => {
	const { currentUser } = useContext(UserContext);
	const [editComment, setEditComment] = useState({
		message: ""
	});

	const handleDelete = useCallback((commentId) => {
		if (window.confirm("Are you sure you want to delete this comment from the video?")) {
			deleteComment(commentId).then(() => {
				alert("This comment was successfully deleted!");
			});
		}
	}, []);

	const handleDeleteComment = useCallback(
		(commentId) => {
			const filteredComments = videoComments.filter((comment) => comment.id !== commentId);
			return setVideosComments(filteredComments);
		},
		[videoComments, setVideosComments]
	);

	const handleEdit = useCallback((comment) => {
		setEditComment(comment);
	}, []);

	const handleSaveEdit = useCallback(() => {
		updateComment(editComment).then(() => {
			const updatedComments = videoComments.map((comment) => (comment.id === editComment.id ? editComment : comment));
			setVideosComments(updatedComments);
			setEditComment("");
		});
	}, [editComment, setVideosComments, videoComments]);

	return (
		<>
			{videoComments.map((comment) => {
				return (
					<div className="grid h-12 grid-cols-12 content-center" key={comment.id}>
						{editComment?.id === comment.id ? (
							<>
								<input
									type="text"
									className="col-span-10 rounded-3xl"
									value={editComment.message}
									onChange={(event) => {
										const copy = {...editComment}
										copy.message = event.target.value
										setEditComment(copy)
									}										
									}
								/>
								<button className="btn-primary my-1" onClick={handleSaveEdit}>
									Save
								</button>
								<button className="btn-primary my-1" onClick={() => setEditComment("")}>
									Cancel
								</button>
							</>
						) : (
							<div className="col-span-10 my-1 rounded-3xl bg-emerald-100 pl-2 text-xl text-black">
								<span className="font-semibold">{comment?.userProfile?.displayName}:</span>
								<span> {comment?.message}</span>
							</div>
						)}
						{currentUser?.id === comment?.userProfile?.id && editComment?.id !== comment.id ? (
							<>
								<button className="btn-primary m-1" onClick={() => handleEdit(comment)}>
									Edit
								</button>
								<button
									className="btn-delete m-1"
									onClick={() => {
										handleDelete(comment.id);
										handleDeleteComment(comment.id);
									}}
								>
									Delete
								</button>
							</>
						) : (
							""
						)}
					</div>
				);
			})}
		</>
	);
});
