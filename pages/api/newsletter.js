export default function handler(req, res) {
	switch (req.method) {
		case 'POST':
			return POST(req, res);

		case 'GET':
		default:
			return GET(req, res);
	}
}

const POST = (req, res) => {
	const { email } = req.body;
	console.log(req.body);

	if (!email || !email.includes('@')) {
		return res.status(422).json({
			message: 'Invalid email address',
		});
	}

	return res.status(201).json({
		message: 'You have been registered for a newsletter mailing!',
	});
};

const GET = (req, res) => {
	return res.status(200).json({ message: 'WIP' });
};
