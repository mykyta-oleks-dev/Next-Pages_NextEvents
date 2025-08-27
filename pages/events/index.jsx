import Head from 'next/head';
import EventsList from '../../components/events/List';
import EventsSearch from '../../components/events/Search';
import { getAllEvents } from '../../lib/mongodb/events';

const EventsPage = ({ events }) => {
	return (
		<div>
			<Head>
				<title>All the Events - NextEvents</title>
				<meta
					name="description"
					content="Have a look at all the events we are glad to share with you"
				/>
			</Head>
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
