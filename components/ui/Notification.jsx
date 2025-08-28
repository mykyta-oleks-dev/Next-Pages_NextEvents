import classes from './Notification.module.css';

function Notification({ title, message, status }) {
	const statusClasses = getStatusClass(status);

	return (
		<div className={`${classes.notification} ${statusClasses}`}>
			<h2>{title}</h2>
			<p>{message}</p>
		</div>
	);
}

const getStatusClass = (status) => {
	switch (status) {
		case 'success':
			return classes.success;

		case 'error':
			return classes.error;

		case 'pending':
			return classes.pending;

		default:
			return '';
	}
};

export default Notification;
