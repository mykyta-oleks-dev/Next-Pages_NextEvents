import Link from 'next/link';
import classes from './CommentsList.module.css';

function CommentList({ comments }) {
	console.log(comments);
	return (
		<ul className={classes.comments}>
			{comments.map((c) => (
				<li key={c.id}>
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
