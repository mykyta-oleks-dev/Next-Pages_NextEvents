import { createContext, useContext, useMemo, useState } from 'react';

const NotificationContext = createContext({
	notification: null,
	showNotification(title, message, status) {},
	hideNotification() {},
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationContextProvider = ({ children }) => {
	const [notification, setNotification] = useState(null);

	const showNotification = (title, message, status) => {
		setNotification({ title, message, status });
	};

	const hideNotification = () => {
		setNotification(null);
	};

	const value = { notification, showNotification, hideNotification };

	return (
		<NotificationContext.Provider value={value}>
			{children}
		</NotificationContext.Provider>
	);
};
