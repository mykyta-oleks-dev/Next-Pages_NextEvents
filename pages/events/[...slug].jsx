import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';
import EventsSearch from '../../components/events/Search';
import EventsList from '../../components/events/List';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ErrorAlert';

const PageContent = ({ year, month }) => {
	if (isNaN(parseInt(year)) || isNaN(parseInt(month))) {
		return (
			<ErrorAlert>
				<p>Please enter valid numeric values of year and month</p>
			</ErrorAlert>
		);
	}

	const events = getFilteredEvents({ year: +year, month: +month });

	if (events?.length > 0) {
		return <EventsList events={events} />;
	} else {
		return (
			<ErrorAlert>
				<p>No event is available by the specified filter</p>
				<Button href="/events">Go to all events</Button>
			</ErrorAlert>
		);
	}
};

const EventsFilterPage = () => {
	const router = useRouter();
	const slug = router.query.slug;

	if (!slug) return <p className="center">Loading...</p>;

	const [year, month] = slug;

	return (
		<div>
			<EventsSearch defaultYear={year} defaultMonth={month} />
			<PageContent year={year} month={month} />
		</div>
	);
};

export default EventsFilterPage;
