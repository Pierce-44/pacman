import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import React from 'react';
import Row from '../components/Row';
import useCheckDirection from '../hooks/useCheckDirection';
import useGetPosition from '../hooks/useGetPosition';
import useHandlePacManPosition from '../hooks/useHandlePacManPosition';
import { ghostMapData, mapData } from '../util/mapData';
import useHandleMovingGhosts from '../hooks/useHandleMovingGhosts';

const Home: NextPage = () => {
	const [map, setMap] = React.useState(mapData);
	const [ghostMap, setGhostMap] = React.useState(ghostMapData);
	const [eat, setEat] = React.useState(true);
	const ghosts = [
		{ name: 'red', coords: useGetPosition(ghostMap, 'gR'), code: 'gR' },
		{ name: 'pink', coords: useGetPosition(ghostMap, 'gP'), code: 'gP' },
		{ name: 'green', coords: useGetPosition(ghostMap, 'gG'), code: 'gG' },
		{ name: 'blue', coords: useGetPosition(ghostMap, 'gB'), code: 'gB' },
		{ name: 'yellow', coords: useGetPosition(ghostMap, 'gY'), code: 'gY' },
		{ name: 'purple', coords: useGetPosition(ghostMap, 'gPu'), code: 'gPu' },
		{ name: 'orange', coords: useGetPosition(ghostMap, 'gO'), code: 'gO' },
		{ name: 'white', coords: useGetPosition(ghostMap, 'gW'), code: 'gW' },
		{ name: 'grey', coords: useGetPosition(ghostMap, 'gGr'), code: 'gGr' },
		{ name: 'brown', coords: useGetPosition(ghostMap, 'gBr'), code: 'gBr' },
		{ name: 'turc', coords: useGetPosition(ghostMap, 'gTu'), code: 'gTu' },
	];

	const direction = useCheckDirection({
		up: 'w',
		down: 's',
		left: 'a',
		right: 'd',
	});

	const pacManCoords = useGetPosition(map, 'P');

	useHandlePacManPosition({ direction, setMap });

	useHandleMovingGhosts({ ghosts, setGhostMap });

	React.useEffect(() => {
		setTimeout(() => setEat(!eat), 250);
	}, [eat]);

	return (
		<div>
			<Head>
				<title>PacMan</title>
				<meta name="description" content="PacMan" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="mx-auto my-auto w-min">
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
						<div
							className={`${
								direction === 'a'
									? 'rotate-180'
									: '' || direction === 's'
									? 'rotate-90'
									: '' || direction === 'w'
									? '-rotate-90'
									: ''
							} relative rounded-full overflow-hidden h-full w-full`}
						>
							<div
								className={`${
									eat
										? '-rotate-[30deg] left-[-3px] top-[-1px]'
										: 'left-0 top-0'
								} absolute   h-1/2 w-full bg-[#fffb00] transition-all ease-linear  duration-150`}
							></div>
							<div
								className={`${
									eat
										? 'rotate-[30deg] left-[-3px] bottom-[-1px]'
										: 'left-0 bottom-0'
								} absolute h-1/2 w-full bg-[#fffb00] transition-all ease-linear  duration-150`}
							></div>
						</div>
					</div>
					{ghosts.map((ghostInfo, index) => (
						<div
							key={index}
							className="absolute transition-all  ease-linear h-5 duration-150 top-0 left-0 w-5 flex justify-center items-center"
							style={{
								transform: `translateX(${
									ghostInfo.coords.x! * 20
								}px) translateY(${ghostInfo.coords.y! * 20}px)`,
							}}
						>
							<Image
								src={`/${ghostInfo.name}.png`}
								alt="ghost"
								width={30}
								height={30}
								priority
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
