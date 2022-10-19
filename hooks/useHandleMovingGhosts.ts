/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { ghostMapData } from '../util/mapData';

interface props {
	ghosts: {
		name: string;
		coords: {
			x: number | undefined;
			y: number | undefined;
		};
		code: string;
	}[];
	setGhostMap: React.Dispatch<React.SetStateAction<string[][]>>;
}

function setNewPosition(
	currentPosition: number,
	currentArray: number,
	nameCode: string,
	moveRules: { [key: string]: string[] },
	setMoveRules: React.Dispatch<
		React.SetStateAction<{ [key: string]: string[] }>
	>,
	setGhostMap: React.Dispatch<React.SetStateAction<string[][]>>
) {
	const availablePosition = [];

	const checkUp = ghostMapData[currentArray - 1][currentPosition].includes('a');
	const checkDown =
		ghostMapData[currentArray + 1][currentPosition].includes('a');
	const checkRight =
		ghostMapData[currentArray][currentPosition + 1].includes('a');
	const checkLeft =
		ghostMapData[currentArray][currentPosition - 1].includes('a');

	let x;
	let y;

	// top right and left CORNERS
	if (currentPosition === 1 && currentArray === 1) {
		setMoveRules((params: any) => ({
			...params,
			[nameCode]: ['down', 'right'],
		}));
		x = 'right';
		y = 'down';
	} else if (currentPosition === 25 && currentArray === 1) {
		setMoveRules((params: any) => ({
			...params,
			[nameCode]: ['down', 'left'],
		}));
		x = 'left';
		y = 'down';
	}
	// bottom right and left CORNERS
	if (currentPosition === 1 && currentArray === 24) {
		setMoveRules((params: any) => ({
			...params,
			[nameCode]: ['up', 'right'],
		}));
		x = 'right';
		y = 'down';
	} else if (currentPosition === 25 && currentArray === 24) {
		setMoveRules((params: any) => ({
			...params,
			[nameCode]: ['up', 'left'],
		}));
		x = 'left';
		y = 'down';
	}

	// only sides (EXCLUDING top and bottom sides)
	if (
		currentPosition === 1 &&
		currentArray !== 24 &&
		currentPosition === 1 &&
		currentArray !== 1
	) {
		setMoveRules((params: any) => ({
			...params,
			[nameCode]: [moveRules[nameCode][0], 'right'],
		}));
		x = 'right';
	} else if (
		currentPosition === 25 &&
		currentArray !== 24 &&
		currentPosition === 25 &&
		currentArray !== 1
	) {
		setMoveRules((params: any) => ({
			...params,
			[nameCode]: [moveRules[nameCode][0], 'left'],
		}));
		x = 'left';
	}

	// only up and down (EXCLUDING left and right sides)
	if (
		currentArray === 1 &&
		currentPosition !== 25 &&
		currentArray === 1 &&
		currentPosition !== 1
	) {
		setMoveRules((params: any) => ({
			...params,
			[nameCode]: ['down', moveRules[nameCode][1]],
		}));
		y = 'down';
	} else if (
		currentArray === 24 &&
		currentPosition !== 25 &&
		currentArray === 24 &&
		currentPosition !== 1
	) {
		setMoveRules((params: any) => ({
			...params,
			[nameCode]: ['up', moveRules[nameCode][1]],
		}));
		y = 'up';
	}

	if ((checkUp && moveRules[nameCode][0] === 'up') || (checkUp && y === 'up')) {
		availablePosition.push({
			array: currentArray - 1,
			position: currentPosition,
		});
	} else if (
		(checkDown && moveRules[nameCode][0] === 'down') ||
		(checkDown && y === 'down')
	) {
		availablePosition.push({
			array: currentArray + 1,
			position: currentPosition,
		});
	}

	if (
		(checkRight && moveRules[nameCode][1] === 'right') ||
		(checkRight && x === 'right')
	) {
		availablePosition.push({
			array: currentArray,
			position: currentPosition + 1,
		});
	} else if (
		(checkLeft && moveRules[nameCode][1] === 'left') ||
		(checkLeft && x === 'left')
	) {
		availablePosition.push({
			array: currentArray,
			position: currentPosition - 1,
		});
	}

	// this Check is for the + sections on the map
	if (availablePosition.length === 0 && checkRight) {
		availablePosition.push({
			array: currentArray,
			position: currentPosition + 1,
		});
		setMoveRules((params: any) => ({
			...params,
			[nameCode]: [moveRules[nameCode][0], 'right'],
		}));
	} else if (availablePosition.length === 0 && checkLeft) {
		availablePosition.push({
			array: currentArray,
			position: currentPosition - 1,
		});
		setMoveRules((params: any) => ({
			...params,
			[nameCode]: [moveRules[nameCode][0], 'left'],
		}));
	} else if (availablePosition.length === 0 && checkUp) {
		availablePosition.push({
			array: currentArray - 1,
			position: currentPosition,
		});
		setMoveRules((params: any) => ({
			...params,
			[nameCode]: [moveRules[nameCode][0], 'left'],
		}));
	} else if (availablePosition.length === 0 && checkDown) {
		availablePosition.push({
			array: currentArray + 1,
			position: currentPosition,
		});
		setMoveRules((params: any) => ({
			...params,
			[nameCode]: [moveRules[nameCode][0], 'left'],
		}));
	}

	if (!checkDown && !checkLeft && !checkRight && !checkUp) {
		// do nothing
	} else {
		const randomAvailablePosition =
			availablePosition[Math.floor(Math.random() * availablePosition.length)];
		ghostMapData[currentArray][currentPosition] = 'a';

		ghostMapData[randomAvailablePosition?.array][
			randomAvailablePosition?.position
		] = nameCode;
		setGhostMap([...ghostMapData]);
	}
}

export default function useHanldeMovingGhosts({ ghosts, setGhostMap }: props) {
	const [moveGhosts, setMoveGhosts] = React.useState(true);

	let checkedGhosts: string[] = [];

	const [moveRules, setMoveRules] = React.useState<{ [key: string]: string[] }>(
		{
			gR: ['up', 'right'],
			gP: ['down', 'left'],
			gG: ['down', 'left'],
			gB: ['up', 'right'],
			gY: ['down', 'left'],
			gPu: ['down', 'left'],
			gO: ['up', 'right'],
			gW: ['down', 'left'],
			gGr: ['down', 'left'],
			gBr: ['up', 'right'],
			gTu: ['down', 'left'],
		}
	);

	React.useEffect(() => {
		ghosts.map((info) => {
			ghostMapData.map((arrayInfo, arrayNumber) => {
				if (
					arrayInfo.includes(info.code) &&
					!checkedGhosts.includes(info.code)
				) {
					const positionInArray = arrayInfo.indexOf(info.code);

					setNewPosition(
						positionInArray,
						arrayNumber,
						info.code,
						moveRules,
						setMoveRules,
						setGhostMap
					);

					checkedGhosts.push(info.code);
				}
			});
		});
		checkedGhosts = [];

		setTimeout(() => setMoveGhosts(!moveGhosts), 150);
	}, [moveGhosts]);
}
