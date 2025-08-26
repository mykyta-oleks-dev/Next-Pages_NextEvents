import EventsList from '../components/events/List';
import { getFeaturedEvents } from '../lib/events';

const HomePage = ({ events }) => {
	return (
		<div>
			<EventsList events={events} />
		</div>
	);
};

export default HomePage;

export async function getStaticProps() {
	const events = await getFeaturedEvents();

	return {
		props: {
			events,
		},
		revalidate: 1800,
	};
}
