import { getFilteredEvents } from '../../lib/mongodb/events';
import EventsSearch from '../../components/events/Search';
import EventsList from '../../components/events/List';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/ErrorAlert';
import Head from 'next/head';

const Content = ({ events, isError, year, month }) => {
	const monthName = new Date(year, month - 1).toLocaleDateString('en-US', {
		month: 'long',
	});

	if (isError) {
		return (
			<>
				<Head>
					<title>Invalid filter values - NextEvents</title>
					<meta
						name="description"
						content="Please input correct numberic filter values"
					/>
				</Head>
				<ErrorAlert>
					<p>Please enter valid numeric values of year and month</p>
				</ErrorAlert>
			</>
		);
	}

	if (events?.length === 0) {
		return (
			<>
				<Head>
					<title>
						No event is found for {monthName} {year} - NextEvents
					</title>
					<meta
						name="description"
						content="Browse all events page to see what's available"
					/>
				</Head>
				<ErrorAlert>
					<p>No event is available by the specified filter</p>
					<Button href="/events">Go to all events</Button>
				</ErrorAlert>
			</>
		);
	}

	return (
		<>
			<Head>
				<title>
					Events for {monthName} {year} - NextEvents
				</title>
				<meta
					name="description"
					content="Browse the events for your specified year and month"
				/>
			</Head>
			<EventsList events={events} />
		</>
	);
};

const EventsFilterPage = ({ events, isError, year, month }) => {
	return (
		<div>
			<EventsSearch defaultYear={year} defaultMonth={month} />
			<Content
				events={events}
				isError={isError}
				year={year}
				month={month}
			/>
		</div>
	);
};

export default EventsFilterPage;

export async function getServerSideProps(context) {
	const { params } = context;
	const { slug } = params;
	const [year, month] = slug;

	if (isNaN(parseInt(year)) || isNaN(parseInt(month))) {
		return {
			props: {
				isError: true,
			},
		};
	}

	const events = await getFilteredEvents({ year: +year, month: +month });

	return {
		props: {
			events,
			year,
			month,
		},
	};
}
