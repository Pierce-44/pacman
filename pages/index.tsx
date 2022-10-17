import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>PacMan</title>
				<meta name="description" content="PacMan" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<p>pacman</p>
		</div>
	);
};

export default Home;
