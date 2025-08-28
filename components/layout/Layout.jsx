import { useNotification } from '../../store/notificationContext';
import NotificationOverlay from '../ui/Notification';
import Header from './Header';

const Layout = ({ children }) => {
	const { notification } = useNotification();

	return (
		<>
			<Header />
			<main>{children}</main>
			{notification && (
				<NotificationOverlay
					title={notification.title}
					message={
						notification.message ??
						getFallbackMessage(notification.status)
					}
					status={notification.status}
				/>
			)}
		</>
	);
};

const getFallbackMessage = (status) => {
	switch (status) {
		case 'error':
			return 'An unexpected error occured!';
		case 'success':
			return 'The operation was a success!';
		case 'pending':
		default:
			return 'Loading...';
	}
};

export default Layout;
