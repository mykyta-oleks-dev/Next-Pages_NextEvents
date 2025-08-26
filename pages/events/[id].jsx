import { useRouter } from 'next/router';
import { getEventById } from '../../dummy-data';
import EventSummary from '../../components/events/detail/EventSummary';
import EventLogistics from '../../components/events/detail/EventLogistics';
import EventContent from '../../components/events/detail/EventContent';
import ErrorAlert from '../../components/ErrorAlert';

const EventDetailsPage = () => {
	const router = useRouter();
	const id = router.query.id;

	const event = getEventById(id);

	if (!event) {
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
