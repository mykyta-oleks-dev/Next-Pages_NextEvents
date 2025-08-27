import { getCollection } from '../../../../lib/mongodb/client';

export default async function handler(req, res) {
	switch (req.method) {
		case 'POST':
			return await POST(req, res);
		case 'GET':
		default:
			return await GET(req, res);
	}
}

const POST = async (req, res) => {
	const { id } = req.query;
	console.log({ id });
	const { email, name, content } = req.body;

	if (
		!email ||
		email.trim() === '' ||
		!email.includes('@') ||
		!name ||
		name.trim() === '' ||
		!content ||
		content.trim() === ''
	) {
		return res.status(422).json({
			message: 'Invalid input data',
		});
	}

	const newComment = {
		eventId: id,
		email,
		name,
		content,
		createdAt: new Date(),
	};

	try {
		const collection = await getCollection('comments');

		const result = await collection.insertOne(newComment);

		return res.status(201).json({
			message: 'Comment was saved!',
			comment: { ...newComment, _id: result.insertedId },
		});
	} catch (err) {
		console.error('MongoDB insert error:', err);

		return res.status(500).json({ message: 'Saving comment failed.' });
	}
};

const GET = async (req, res) => {
	const { id } = req.query;

	try {
		const collection = await getCollection('comments');

		const comments = await collection
			.find({ eventId: id })
			.sort({ createdAt: -1 })
			.toArray();

		return res.status(200).json({
			message: 'Comments fetched successfully!',
			comments,
		});
	} catch (err) {
		console.error('MongoDB fetch error:', err);

		return res.status(500).json({ message: 'Fetching comments failed.' });
	}
};
