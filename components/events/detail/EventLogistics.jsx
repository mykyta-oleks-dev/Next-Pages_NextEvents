import AddressIcon from '../../icons/AddressIcon';
import DateIcon from '../../icons/DateIcon';
import LogisticsItem from './LogisticsItem';
import classes from './EventLogistics.module.css';
import { parseDate, parseLocation } from '../../../util/parse';

function EventLogistics({ date, location, image, imageAlt }) {
	const parsedDate = parseDate(date);
	const parsedLocation = parseLocation(location);

	return (
		<section className={classes.logistics}>
			<div className={classes.image}>
				<img src={`/${image}`} alt={imageAlt} />
			</div>
			<ul className={classes.list}>
				<LogisticsItem icon={DateIcon}>
					<time>{parsedDate}</time>
				</LogisticsItem>
				<LogisticsItem icon={AddressIcon}>
					<address>{parsedLocation}</address>
				</LogisticsItem>
			</ul>
		</section>
	);
}

export default EventLogistics;
