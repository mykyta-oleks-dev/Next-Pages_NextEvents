const parseFirebase = (firebaseData) =>
	Object.entries(firebaseData).map(([key, value]) => ({ id: key, ...value }));

const getEvents = async (filter) => {
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
	const data = await getEvents('orderBy="isFeatured"&equalTo=true');

	return data;
}

export async function getAllEvents() {
	const data = await getEvents();

	return data;
}

const getUTCDateRange = (year, month) => [
	new Date(Date.UTC(year, month - 1, 1)).toISOString().split('T')[0],
	new Date(Date.UTC(year, month, 0)).toISOString().split('T')[0],
];

export async function getFilteredEvents(dateFilter) {
	const { year, month } = dateFilter;

	const [dateStart, dateEnd] = getUTCDateRange(year, month);

	const data = await getEvents(
		`orderBy="date"&startAt="${dateStart}"&endAt="${dateEnd}"`
	);

	return data;
}

export async function getEventById(id) {
	const data = await getEvent(id);

	return data;
}
