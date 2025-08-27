import { useState } from 'react';

import CommentList from './CommentsList';
import NewComment from './NewComment';
import classes from './Comments.module.css';

function Comments({ eventId }) {
	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState([]);

	function toggleCommentsHandler() {
		if (!showComments) {
			fetch(`/api/events/${eventId}/comments`)
				.then((res) => res.json())
				.then((data) => setComments(data.comments));
		}

		setShowComments((prevStatus) => !prevStatus);
	}

	function handleAddComment(commentData) {
		fetch(`/api/events/${eventId}/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(commentData),
		})
			.then((res) => res.json())
			.then((data) => alert(data.message));
	}

	return (
		<section className={classes.comments}>
			<button onClick={toggleCommentsHandler}>
				{showComments ? 'Hide' : 'Show'} Comments
			</button>
			{showComments && <NewComment onAddComment={handleAddComment} />}
			{showComments && <CommentList comments={comments} />}
		</section>
	);
}

export default Comments;
