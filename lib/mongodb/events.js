import { getCollection } from './client';

export async function getAllEvents() {
	const collection = await getCollection();

	return await collection.find().toArray();
}

export async function getFeaturedEvents() {
	const collection = await getCollection();

	return await collection.find({ isFeatured: true }).toArray();
}

export async function getEventById(id) {
	const collection = await getCollection();
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


	return await collection
		.find({
			date: {
				$gte: dateStart,
				$lte: dateEnd,
			},
		})
		.toArray();
}
