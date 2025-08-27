import { getCollection } from '../../lib/mongodb/client';

export default async function handler(req, res) {
	switch (req.method) {
		case 'POST':
			return await POST(req, res);

		case 'GET':
		default:
			return GET(req, res);
	}
}

const POST = async (req, res) => {
	const { email } = req.body;
	console.log(req.body);

	if (!email || !email.includes('@')) {
		return res.status(422).json({
			message: 'Invalid email address',
		});
	}

	try {
		const collection = await getCollection('newsletter');

		const candidate = await collection.findOne({
			email,
		});

		if (candidate) {
			return res.status(422).json({
				message: 'Email address is already subscribed.',
			});
		}

		const result = await collection.insertOne({
			email,
			createdAt: new Date(),
		});

		return res.status(201).json({
			message: 'You have been registered!',
			id: result.insertedId,
		});
	} catch (err) {
		console.error('MongoDB insert error:', err);

		return res.status(500).json({
			message: 'Subscribing failed.',
		});
	}
};

const GET = async (req, res) => {
	try {
		const collection = await getCollection('newsletter');
		const docs = await collection.find().toArray();

		return res.status(200).json({ subscribers: docs });
	} catch (err) {
		console.error('MongoDB fetch error:', err);
		return res.status(500).json({ message: 'Something went wrong.' });
	}
};
