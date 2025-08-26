import classes from './Item.module.css';
import Button from '../ui/Button';
import DateIcon from '../icons/DateIcon';
import AddressIcon from '../icons/AddressIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import { parseDate, parseLocation } from '../../util/parse';

const EventItem = ({ event }) => {
	const parsedDate = parseDate(event.date);
	const parsedLocation = parseLocation(event.location);

	return (
		<li className={classes.item}>
			<img src={'/' + event.image} alt={event.title} />
			<div className={classes.content}>
				<div>
					<h2>{event.title}</h2>
					<div className={classes.date}>
						<DateIcon />
						<time datetime={event.date}>{parsedDate}</time>
					</div>
					<div className={classes.address}>
						<AddressIcon />
						<address>{parsedLocation}</address>
					</div>
				</div>
				<div className={classes.actions}>
					<Button href={`/events/${event.id}`}>
						<span>Explore event</span>
						<span className={classes.icon}>
							<ArrowRightIcon />
						</span>
					</Button>
				</div>
			</div>
		</li>
	);
};

export default EventItem;
