import Button from '../ui/Button';
import classes from './Search.module.css';

const years = [2025, 2024];

const months = [
	{ value: 1, label: 'January' },
	{ value: 2, label: 'February' },
	{ value: 3, label: 'March' },
	{ value: 4, label: 'April' },
	{ value: 5, label: 'May' },
	{ value: 6, label: 'June' },
	{ value: 7, label: 'July' },
	{ value: 8, label: 'August' },
	{ value: 9, label: 'September' },
	{ value: 10, label: 'October' },
	{ value: 11, label: 'November' },
	{ value: 12, label: 'December' },
];

const EventsSearch = () => {
	return (
		<form className={classes.form}>
			<div className={classes.controls}>
				<div className={classes.control}>
					<label htmlFor="yeah">Year</label>
					<select name="year" id="year">
						{years.map((y) => (
							<option key={`y-${y}`} value={y}>
								{y}
							</option>
						))}
					</select>
				</div>
				<div className={classes.control}>
					<label htmlFor="month">Month</label>
					<select name="month" id="month">
						{months.map(({ value, label }) => (
							<option key={`m-${value}`} value={value}>
								{label}
							</option>
						))}
					</select>
				</div>
			</div>
			<Button>Search</Button>
		</form>
	);
};

export default EventsSearch;
