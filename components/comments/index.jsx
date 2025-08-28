import { useState } from 'react';

import CommentList from './CommentsList';
import NewComment from './NewComment';
import classes from './Comments.module.css';
import { useNotification } from '../../store/notificationContext';

function Comments({ eventId }) {
	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState([]);

	const { showNotification, hideNotification } = useNotification();

	function toggleCommentsHandler() {
		if (!showComments) {
			showNotification(
				'Loading comments...',
				'That can take a few seconds',
				'pending'
			);
			fetch(`/api/events/${eventId}/comments`)
				.then((res) => res.json())
				.then((data) => {
					setComments(data.comments);
					hideNotification();
				})
				.catch((err) =>
					showNotification(
						'An error!',
						err.message,
						'error'
					)
				);
		}

		setShowComments((prevStatus) => !prevStatus);
	}

	function handleAddComment(commentData) {
		showNotification(
			'Saving your comment...',
			'Please wait while we are saving your comment',
			'pending'
		);
		fetch(`/api/events/${eventId}/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(commentData),
		})
			.then(async (res) => {
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.message ?? 'An error saving comment');
				}

				return data;
			})
			.then((data) => {
				showNotification('Success!', data.message, 'success');
				setComments((prev) => [data.comment, ...prev]);
			})
			.catch((err) => {
				showNotification('An error!', err.message, 'error');
			});
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
