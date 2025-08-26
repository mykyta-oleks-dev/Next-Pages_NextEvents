import { useRouter } from 'next/router';

const EventsFilterPage = () => {
	const router = useRouter();
	const slug = router.query.slug;
	console.log(slug);
	return (
		<div>
			<h1>
				EventFilters: {Array.isArray(slug) ? slug.join(', ') : slug}
			</h1>
		</div>
	);
};

export default EventsFilterPage;
