import { useState } from "react";

export const AddAComment = ({ id, handleAddComment }) => {
	const [newComment, setNewComment] = useState({
		message: "",
		videoId: id,
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		handleAddComment(newComment);
		setNewComment({ message: "", videoId: id });
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-row w-full self-center">
			<fieldset className="w-5/6">
				<input
					type="text"
					placeholder="Add A Comment"
                    className="w-full rounded-3xl border border-gray-400 px-4 py-2 focus:border-blue-400 focus:outline-none"
					value={newComment.message}
					onChange={(event) => {
						const copy = { ...newComment };
						copy.message = event.target.value;
						setNewComment(copy);
					}}
				/>
			</fieldset>
            <fieldset>
                <button type="submit" className="btn-primary">
                    Add Comment
                </button>
            </fieldset>
		</form>
	);
};