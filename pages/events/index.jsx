import EventsList from '../../components/events/List';
import EventsSearch from '../../components/events/Search';
import { getAllEvents } from '../../lib/events';

const EventsPage = ({ events }) => {
	return (
		<div>
			<EventsSearch />
			<EventsList events={events} />
		</div>
	);
};

export default EventsPage;

export async function getStaticProps() {
	const events = await getAllEvents();

	return {
		props: {
			events,
		},
		revalidate: 600,
	};
}
