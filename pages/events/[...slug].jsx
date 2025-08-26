import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';
import EventsSearch from '../../components/events/Search';
import EventsList from '../../components/events/List';

const EventsFilterPage = () => {
	const router = useRouter();
	const slug = router.query.slug;

	if (!slug) return <p>Loading...</p>;

	const [year, month] = slug;

	const events = getFilteredEvents({ year: +year, month: +month });

	return (
		<div>
			<EventsSearch defaultYear={year} defaultMonth={month} />
			{events && events.length > 0 ? (
				<EventsList events={events} />
			) : (
				<p className="center">
					No event is available by the specified filter
				</p>
			)}
		</div>
	);
};

export default EventsFilterPage;
