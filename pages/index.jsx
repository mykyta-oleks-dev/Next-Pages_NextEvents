import EventsList from '../components/events/List';
import { getFeaturedEvents } from '../dummy-data';

const HomePage = () => {
	const events = getFeaturedEvents();

	return (
		<div>
			<h1>HomePage</h1>
			<EventsList events={events} />
		</div>
	);
};

export default HomePage;
