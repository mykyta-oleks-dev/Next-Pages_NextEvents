import client from './client';

const getCollection = async () => {
	if (!client.topology?.isConnected()) {
		await client.connect();
	}

	return client.db().collection('events');
};

export async function getAllEvents() {
	const collection = await getCollection();
	console.log('using mongo all');

	return await collection.find().toArray();
}

export async function getFeaturedEvents() {
	const collection = await getCollection();
	console.log('using mongo featured');

	return await collection.find({ isFeatured: true }).toArray();
}

export async function getEventById(id) {
	const collection = await getCollection();
	console.log('using mongo one');
	return await collection.findOne({ _id: id });
}

const getUTCDateRange = (year, month) => [
	new Date(Date.UTC(year, month - 1, 1)).toISOString().split('T')[0],
	new Date(Date.UTC(year, month, 0)).toISOString().split('T')[0],
];

export async function getFilteredEvents(dateFilter) {
	const { year, month } = dateFilter;
	const [dateStart, dateEnd] = getUTCDateRange(year, month);

	const collection = await getCollection();

	console.log('using mongo filtered');

	return await collection
		.find({
			date: {
				$gte: dateStart,
				$lte: dateEnd,
			},
		})
		.toArray();
}
