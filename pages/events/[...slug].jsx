import { getFilteredEvents } from '../../lib/events';
import EventsSearch from '../../components/events/Search';
import EventsList from '../../components/events/List';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ErrorAlert';

const EventsFilterPage = ({ events, isError, year, month }) => {
	return (
		<div>
			<EventsSearch defaultYear={year} defaultMonth={month} />
			{isError && (
				<ErrorAlert>
					<p>Please enter valid numeric values of year and month</p>
				</ErrorAlert>
			)}
			{!isError && events?.length === 0 && (
				<ErrorAlert>
					<p>No event is available by the specified filter</p>
					<Button href="/events">Go to all events</Button>
				</ErrorAlert>
			)}
			{!isError && events?.length > 0 && <EventsList events={events} />}
		</div>
	);
};

export default EventsFilterPage;

export async function getServerSideProps(context) {
	const { params } = context;
	const { slug } = params;
	const [year, month] = slug;

	if (isNaN(parseInt(year)) || isNaN(parseInt(month))) {
		return {
			props: {
				isError: true,
			},
		};
	}

	const events = await getFilteredEvents({ year: +year, month: +month });

	return {
		props: {
			events,
			year,
			month,
		},
	};
}
