import Layout from '../components/layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Head>
				<title>NextEvents</title>
				<meta
					name="description"
					content="Your web service for exploring events"
				/>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
