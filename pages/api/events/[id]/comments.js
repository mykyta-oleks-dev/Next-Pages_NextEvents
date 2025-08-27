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
		id: Date.now(),
		email,
		name,
		content,
	};

	return res.status(201).json({
		message: 'Comment was saved!',
		comment: newComment,
	});
};

const GET = (req, res) => {
	const { id } = req.query;

	return res.status(200).json({
		message: 'Comments for an events fetched successfully!',
		comments: [
			{
				id: 1,
				email: 'test@test.test',
				name: 'test 1',
				content: `content 1 of event #${id}`,
			},
			{
				id: 2,
				email: 'test@test.test',
				name: 'test 2',
				content: `content 2 of event #${id}`,
			},
			{
				id: 3,
				email: 'test@test.test',
				name: 'test 3',
				content: `content 3 of event #${id}`,
			},
		],
	});
};
