import { getFeaturedEvents } from '../../dummy-data';
import EventsList from '../../components/events/List';

const EventsPage = () => {
	const events = getFeaturedEvents();

	return (
		<div>
			<h1>EventsPage</h1>
			<EventsList events={events} />
		</div>
	);
};

export default EventsPage;
