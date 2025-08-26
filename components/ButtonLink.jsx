import Link from 'next/link';
import classes from './ButtonLink.module.css';

const ButtonLink = ({ children, href }) => {
	return (
		<Link href={href} className={classes.btn}>
			{children}
		</Link>
	);
};

export default ButtonLink;
