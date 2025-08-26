import { useRef } from 'react';
import Button from '../ui/Button';
import classes from './Search.module.css';
import { useRouter } from 'next/router';

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

const EventsSearch = ({ defaultYear, defaultMonth }) => {
	const yearRef = useRef(null);
	const monthRef = useRef(null);
	const router = useRouter();

	const handleSubmit = (e) => {
		e.preventDefault();

		const year = yearRef.current.value;
		const month = monthRef.current.value;

		router.push(`/events/${year}/${month}`);
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<div className={classes.controls}>
				<div className={classes.control}>
					<label htmlFor="yeah">Year</label>
					<select
						name="year"
						id="year"
						ref={yearRef}
						defaultValue={
							defaultYear ? defaultYear + '' : undefined
						}
					>
						{years.map((y) => (
							<option key={`y-${y}`} value={y}>
								{y}
							</option>
						))}
					</select>
				</div>
				<div className={classes.control}>
					<label htmlFor="month">Month</label>
					<select
						name="month"
						id="month"
						ref={monthRef}
						defaultValue={
							defaultMonth ? defaultMonth + '' : undefined
						}
					>
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
