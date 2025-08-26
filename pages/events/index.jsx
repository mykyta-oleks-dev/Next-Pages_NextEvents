import EventsList from '../../components/events/List';
import EventsSearch from '../../components/events/Search';
import { getAllEvents } from '../../dummy-data';

const EventsPage = () => {
	const events = getAllEvents();

	return (
		<div>
			<EventsSearch />
			<EventsList events={events} />
		</div>
	);
};

export default EventsPage;
