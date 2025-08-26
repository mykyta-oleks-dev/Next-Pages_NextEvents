import Link from 'next/link';
import classes from './Button.module.css';

const Button = ({ children, href, ...props }) => {
	if (href) {
		return (
			<Link href={href} className={classes.btn}>
				{children}
			</Link>
		);
	}

	return (
		<button {...props} className={classes.btn}>
			{children}
		</button>
	);
};

export default Button;
