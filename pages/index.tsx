import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Row from '../components/Row';
import useCheckDirection from '../hooks/useCheckDirection';
import { mapData } from '../util/mapData';

const Home: NextPage = () => {
	const direction = useCheckDirection({
		up: 'w',
		down: 's',
		left: 'a',
		right: 'd',
	});

	console.log(direction);

	return (
		<div className=" m-10" onKeyPress={(e) => console.log(e)}>
			<Head>
				<title>PacMan</title>
				<meta name="description" content="PacMan" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="mx-auto w-min">
				<div className="relative">
					{mapData.map((rowInfo, index) => (
						<Row key={index} rowInfo={rowInfo} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
