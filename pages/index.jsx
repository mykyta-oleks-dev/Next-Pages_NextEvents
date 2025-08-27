import Head from 'next/head';
import EventsList from '../components/events/List';
import { getFeaturedEvents } from '../lib/mongodb/events';
import NewsletterRegistration from '../components/newsletter/Registration';

const HomePage = ({ events }) => {
	return (
		<div>
			<Head>
				<title>Home Page - NextEvents</title>
				<meta
					name="description"
					content="Browse the selected featured events for maximum growth"
				/>
			</Head>
			<NewsletterRegistration />
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
