import EventsList from '../../components/events/List';
import { getAllEvents } from '../../dummy-data';

const EventsPage = () => {
	const events = getAllEvents();

	return (
		<div>
			<EventsList events={events} />
		</div>
	);
};

export default EventsPage;
