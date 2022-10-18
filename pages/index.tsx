import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Row from '../components/Row';
import useCheckDirection from '../hooks/useCheckDirection';
import useGetPacManPosition from '../hooks/useGetPacManPosition';
import useHandlePacManPosition from '../hooks/useHandlePacManPosition';
import { mapData } from '../util/mapData';

const Home: NextPage = () => {
	const [map, setMap] = React.useState(mapData);

	const direction = useCheckDirection({
		up: 'w',
		down: 's',
		left: 'a',
		right: 'd',
	});

	useHandlePacManPosition({ direction, setMap });

	const pacManCoords = useGetPacManPosition(map);

	return (
		<div className=" m-10" onKeyPress={(e) => console.log(e)}>
			<Head>
				<title>PacMan</title>
				<meta name="description" content="PacMan" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="mx-auto w-min">
				<div className="relative">
					{map.map((rowInfo, index) => (
						<Row key={index} rowInfo={rowInfo} />
					))}
					<div
						className="absolute transition-all ease-linear h-5 duration-150 top-0 left-0 w-5 flex justify-center items-center"
						style={{
							transform: `translateX(${pacManCoords.x! * 20}px) translateY(${
								pacManCoords.y! * 20
							}px)`,
						}}
					>
						<div className="rounded-full h-full w-full bg-[#fffb00]"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
