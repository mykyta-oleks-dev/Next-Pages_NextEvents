import { getEventById, getFeaturedEvents } from '../../lib/events';
import EventSummary from '../../components/events/detail/EventSummary';
import EventLogistics from '../../components/events/detail/EventLogistics';
import EventContent from '../../components/events/detail/EventContent';
import ErrorAlert from '../../components/ErrorAlert';

const EventDetailsPage = ({ event }) => {
	if (!event) {
		return <p className="center">Loading...</p>;
	}

	if (event === null) {
		return (
			<ErrorAlert>
				<p>Event not found!</p>
			</ErrorAlert>
		);
	}

	return (
		<div>
			<EventSummary title={event.title} />
			<EventLogistics {...event} imageAlt={event.title} />
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
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
		params: { id: e.id },
	}));

	return {
		paths: params,
		fallback: true,
	};
}
