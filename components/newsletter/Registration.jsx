import { useNotification } from '../../store/notificationContext';
import classes from './Registration.module.css';

function NewsletterRegistration() {
	const { showNotification } = useNotification();

	function registrationHandler(event) {
		event.preventDefault();

		const fd = new FormData(event.target);
		const email = fd.get('newsletter-email');

		showNotification(
			'Subscribing...',
			'We are now saving your email',
			'pending'
		);

		fetch('/api/newsletter', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		})
			.then(async (res) => {
				const data = await res.json();

				if (!res.ok) {
					throw new Error(
						data.message ?? 'An error subscribing to newsletters'
					);
				}

				return data;
			})
			.then((data) =>
				showNotification('Success!', data.message, 'success')
			)
			.catch((err) => {
				showNotification('An error!', err.message, 'error');
			});
	}

	return (
		<section className={classes.newsletter}>
			<h2>Sign up to stay updated!</h2>
			<form onSubmit={registrationHandler}>
				<div className={classes.control}>
					<input
						type="email"
						id="newsletter-email"
						name="newsletter-email"
						placeholder="Your email"
						aria-label="Your email"
					/>
					<button>Register</button>
				</div>
			</form>
		</section>
	);
}

export default NewsletterRegistration;
