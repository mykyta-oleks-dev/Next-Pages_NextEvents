const parseFirebase = (firebaseData) =>
	Object.entries(firebaseData).map(([key, value]) => ({ id: key, ...value }));

const getData = async (filter) => {
	const res = await fetch(
		`${process.env.FIREBASE_URL}/events.json` +
			(filter ? `/?${filter}` : '')
	);
	const firebaseData = await res.json();
	return parseFirebase(firebaseData);
};

const getEvent = async (id) => {
	const res = await fetch(
		`${process.env.FIREBASE_URL}/events.json?orderBy="$key"&equalTo="${id}"`
	);
	const firebaseData = await res.json();

	return parseFirebase(firebaseData)[0];
};

export async function getFeaturedEvents() {
	const data = await getData('orderBy="isFeatured"&equalTo=true');

	return data;
}

export async function getAllEvents() {
	const data = await getData();

	return data;
}

export async function getFilteredEvents(dateFilter) {
	const { year, month } = dateFilter;

	const data = await getData();

	let filteredEvents = data.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === year &&
			eventDate.getMonth() === month - 1
		);
	});

	return filteredEvents;
}

export async function getEventById(id) {
	const data = await getEvent(id);

	return data;
}
