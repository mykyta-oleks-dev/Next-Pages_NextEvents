export const parseDate = (date) =>
	new Date(date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

export const parseLocation = (location) => location.replace(', ', '\n');
