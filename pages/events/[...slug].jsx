import { useRouter } from 'next/router';

const EventsFilterPage = () => {
	const router = useRouter();
	const slug = router.query.slug;

	if (!slug) return <p>Loading...</p>;

	const [year, month] = slug;

	return (
		<div>
			<p>
				{year}, {month}
			</p>
		</div>
	);
};

export default EventsFilterPage;
