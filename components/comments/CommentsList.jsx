import Link from 'next/link';
import classes from './CommentsList.module.css';

function CommentList({ comments }) {
	if (!comments || comments.length === 0) {
		return (
			<p className="center">
				No comments for this event. Be the first one!
			</p>
		);
	}

	return (
		<ul className={classes.comments}>
			{comments.map((c) => (
				<li key={c._id}>
					<p>{c.content}</p>
					<div>
						By{' '}
						<address>
							<Link href={`mailto:${c.email}`}>{c.name}</Link>
						</address>
					</div>
				</li>
			))}
		</ul>
	);
}

export default CommentList;
