import { useEffect, useRef } from 'react';
import { useNotification } from '../../store/notificationContext';
import classes from './Notification.module.css';
import { createPortal } from 'react-dom';

function NotificationOverlay({ title, message, status }) {
	const { hideNotification } = useNotification();

	const timer = useRef();
	useEffect(() => {
		timer.current = setTimeout(() => {
			hideNotification();
		}, 5000);

		return () => {
			clearTimeout(timer.current);
		};
	}, [hideNotification]);

	const statusClasses = getStatusClass(status);

	return createPortal(
		<div className={`${classes.notification} ${statusClasses}`}>
			<h2>{title}</h2>
			<p>{message}</p>
		</div>,
		document.getElementById('overlays')
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

export default NotificationOverlay;
