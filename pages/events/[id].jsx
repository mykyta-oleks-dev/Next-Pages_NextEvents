import { useRouter } from 'next/router';

const EventDetailsPage = () => {
	const router = useRouter();
	return (
		<div>
			<h1>EventDetails: {router.query.id}</h1>
		</div>
	);
};

export default EventDetailsPage;
