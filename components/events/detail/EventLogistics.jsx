import AddressIcon from '../../icons/AddressIcon';
import DateIcon from '../../icons/DateIcon';
import LogisticsItem from './LogisticsItem';
import classes from './EventLogistics.module.css';
import { parseDate, parseLocation } from '../../../util/parse';
import Image from 'next/image';

function EventLogistics({ date, location, image, imageAlt }) {
	const parsedDate = parseDate(date);
	const parsedLocation = parseLocation(location);

	return (
		<section className={classes.logistics}>
			<div className={classes.image}>
				<Image src={`/${image}`} alt={imageAlt} width={320} height={320} />
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
