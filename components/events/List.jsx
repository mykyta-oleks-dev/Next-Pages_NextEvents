import EventItem from "./Item";
import classes from './List.module.css'

const EventsList = ({ events }) => {
	return (
		<ul className={classes.list}>
			{events.map((e) => (
				<EventItem key={e.id} event={e} />
			))}
		</ul>
	);
};

export default EventsList;
