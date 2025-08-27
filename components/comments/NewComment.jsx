import { useRef, useState } from 'react';
import classes from './NewComment.module.css';

function NewComment({ onAddComment }) {
	const [isInvalid, setIsInvalid] = useState(false);

	const emailInputRef = useRef();
	const nameInputRef = useRef();
	const contentInputRef = useRef();

	function handleSubmit(event) {
		event.preventDefault();

		const email = emailInputRef.current.value;
		const name = nameInputRef.current.value;
		const content = contentInputRef.current.value;

		if (
			!email ||
			email.trim() === '' ||
			!email.includes('@') ||
			!name ||
			name.trim() === '' ||
			!content ||
			content.trim() === ''
		) {
			setIsInvalid(true);
			return;
		}

		onAddComment({
			email,
			name,
			content,
		});
	}

	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<div className={classes.row}>
				<div className={classes.control}>
					<label htmlFor="email">Your email</label>
					<input type="email" id="email" ref={emailInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor="name">Your name</label>
					<input type="text" id="name" ref={nameInputRef} />
				</div>
			</div>
			<div className={classes.control}>
				<label htmlFor="content">Your comment</label>
				<textarea
					id="content"
					rows="5"
					ref={contentInputRef}
				></textarea>
			</div>
			{isInvalid && (
				<p>Please enter a valid email address and comment!</p>
			)}
			<button>Submit</button>
		</form>
	);
}

export default NewComment;
