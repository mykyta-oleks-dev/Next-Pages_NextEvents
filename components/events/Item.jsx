import classes from './Item.module.css'
import ButtonLink from '../ButtonLink';

const EventItem = ({ event }) => {
	const parsedDate = new Date(event.date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
	const parsedLocation = event.location.replace(', ', '\n');

	return (
		<li className={classes.item}>
			<img src={'/' + event.image} alt={event.title} />
			<div className={classes.content}>
				<div>
					<h2>{event.title}</h2>
					<div className={classes.date}>
						<time datetime={event.date}>{parsedDate}</time>
					</div>
					<div className={classes.address}>
						<address>{parsedLocation}</address>
					</div>
				</div>
				<div className={classes.actions}>
					<ButtonLink href={`/events/${event.id}`}>Explore event</ButtonLink>
				</div>
			</div>
		</li>
	);
};

export default EventItem;
