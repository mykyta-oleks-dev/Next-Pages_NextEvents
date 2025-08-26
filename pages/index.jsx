import EventsList from '../components/events/List';
import { getFeaturedEvents } from '../dummy-data';

const HomePage = () => {
	const events = getFeaturedEvents();

	return (
		<div>
			<EventsList events={events} />
		</div>
	);
};

export default HomePage;
