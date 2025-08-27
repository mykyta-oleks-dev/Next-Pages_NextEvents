import { getEventById, getFeaturedEvents } from '../../lib/mongodb/events';
import EventSummary from '../../components/events/detail/EventSummary';
import EventLogistics from '../../components/events/detail/EventLogistics';
import EventContent from '../../components/events/detail/EventContent';
import ErrorAlert from '../../components/ui/ErrorAlert';
import Head from 'next/head';
import Comments from '../../components/comments';

const EventDetailsPage = ({ event }) => {
	if (event === null) {
		return (
			<>
				<Head>
					<title>Event not found - NextEvents</title>
					<meta
						name="description"
						content="Check your request for possible errors"
					/>
				</Head>
				<ErrorAlert>
					<p>Event not found!</p>
				</ErrorAlert>
			</>
		);
	}

	if (!event) {
		return (
			<>
				<Head>
					<title>Searching for event... - NextEvents</title>
					<meta
						name="description"
						content="Please wait while we are looking for what you are seeking"
					/>
				</Head>
				<p className="center">Loading...</p>;
			</>
		);
	}

	return (
		<div>
			<Head>
				<title>Event: {event.title} - NextEvents</title>
				<meta name="description" content={event.description} />
			</Head>
			<EventSummary title={event.title} />
			<EventLogistics {...event} imageAlt={event.title} />
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
			<Comments eventId={event._id} />
		</div>
	);
};

export default EventDetailsPage;

export async function getStaticProps(context) {
	const { params } = context;
	const { id } = params;

	const event = await getEventById(id);

	return {
		props: {
			event: event ?? null,
		},
		revalidate: 30,
	};
}

export async function getStaticPaths() {
	const params = (await getFeaturedEvents()).map((e) => ({
		params: { id: e._id },
	}));

	return {
		paths: params,
		fallback: true,
	};
}
