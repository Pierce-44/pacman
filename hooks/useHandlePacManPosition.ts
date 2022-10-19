import React from 'react';
import { mapData, ghostMapData, ghostsNameArray } from '../util/mapData';

interface Props {
	direction: string | boolean;
	specialActive: boolean;
	setGhostMap: React.Dispatch<React.SetStateAction<string[][]>>;
	setMap: React.Dispatch<React.SetStateAction<string[][]>>;
	setSpecialActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function handleNextPosition(
	direction: string,
	moved: boolean,
	specialActive: boolean,
	setGhostMap: React.Dispatch<React.SetStateAction<string[][]>>,
	setMoved: React.Dispatch<React.SetStateAction<boolean>>,
	setMap: React.Dispatch<React.SetStateAction<string[][]>>,
	setSpecialActive: React.Dispatch<React.SetStateAction<boolean>>
) {
	function handleX(
		arrayInfo: string[],
		arrayNumber: number,
		directionFactor: number
	) {
		if (!arrayInfo.includes('P')) {
			return;
		}

		const checker =
			mapData[arrayNumber][arrayInfo.indexOf('P') + directionFactor];

		if (checker === 'e' || checker === 'o' || checker === '0') {
			const x = arrayInfo.indexOf('P') + directionFactor;
			const y = arrayNumber;

			mapData[y][x - directionFactor] = 'e';
			mapData[y][x] = 'P';

			setMap([...mapData]);
			setTimeout(() => setMoved(!moved), 150);
		}
		if (checker === '0') {
			setSpecialActive(true);
		}
	}

	function handleY(
		arrayInfo: string[],
		arrayNumber: number,
		directionFactor: number
	) {
		if (!arrayInfo.includes('P')) {
			return;
		}

		const checker =
			mapData[arrayNumber + directionFactor]?.[arrayInfo.indexOf('P')];

		if (checker === 'e' || checker === 'o' || checker === '0') {
			const x = arrayInfo.indexOf('P');
			const y = arrayNumber + directionFactor;

			mapData[arrayNumber][x] = 'e';
			mapData[y][x] = 'P';

			setMap([...mapData]);
			setTimeout(() => setMoved(!moved), 150);
		}
		if (checker === '0') {
			setSpecialActive(true);
		}
	}

	// stop is needed for when travelling negative Y, without this it jumps straight to the last Y value, this is because it updates the next sub array before the map gets rounded to reading it.
	let stop = false;

	if (specialActive) {
		mapData.map((arrayInfo, arrayNumber) => {
			if (!arrayInfo.includes('P')) {
				return;
			}
			const ghostCheckUp =
				ghostMapData[arrayNumber][arrayInfo.indexOf('P') + 1];
			const ghostCheckDown =
				ghostMapData[arrayNumber][arrayInfo.indexOf('P') - 1];
			const ghostCheckLeft =
				ghostMapData[arrayNumber + 1][arrayInfo.indexOf('P')];
			const ghostCheckRight =
				ghostMapData[arrayNumber - 1][arrayInfo.indexOf('P')];
			const ghostCheckCurrent =
				ghostMapData[arrayNumber][arrayInfo.indexOf('P')];

			if (ghostsNameArray.includes(ghostCheckUp)) {
				ghostMapData[arrayNumber][arrayInfo.indexOf('P') + 1] = 'a';
				ghostMapData[12][12] = ghostCheckUp;
			}
			if (ghostsNameArray.includes(ghostCheckDown)) {
				ghostMapData[arrayNumber][arrayInfo.indexOf('P') - 1] = 'a';
				ghostMapData[12][12] = ghostCheckDown;
			}
			if (ghostsNameArray.includes(ghostCheckLeft)) {
				ghostMapData[arrayNumber + 1][arrayInfo.indexOf('P')] = 'a';
				ghostMapData[12][12] = ghostCheckLeft;
			}
			if (ghostsNameArray.includes(ghostCheckRight)) {
				ghostMapData[arrayNumber - 1][arrayInfo.indexOf('P')] = 'a';
				ghostMapData[12][12] = ghostCheckRight;
			}
			if (ghostsNameArray.includes(ghostCheckCurrent)) {
				ghostMapData[arrayNumber][arrayInfo.indexOf('P')] = 'a';
				ghostMapData[12][12] = ghostCheckCurrent;
			}

			setGhostMap([...ghostMapData]);
		});
	}

	if (direction === 'd') {
		mapData.map((arrayInfo, arrayNumber) => {
			handleX(arrayInfo, arrayNumber, 1);
		});
	} else if (direction === 'a') {
		mapData.map((arrayInfo, arrayNumber) => {
			handleX(arrayInfo, arrayNumber, -1);
		});
	} else if (direction === 's') {
		mapData.map((arrayInfo, arrayNumber) => {
			if (arrayInfo.includes('P') && !stop) {
				stop = true;
				handleY(arrayInfo, arrayNumber, 1);
			}
		});
	} else if (direction === 'w') {
		mapData.map((arrayInfo, arrayNumber) => {
			handleY(arrayInfo, arrayNumber, -1);
		});
	}
}

export default function useHandlePacManPosition({
	direction,
	specialActive,
	setGhostMap,
	setMap,
	setSpecialActive,
}: Props) {
	const [moved, setMoved] = React.useState(false);

	React.useEffect(() => {
		if (
			direction === 'd' ||
			direction === 'a' ||
			direction === 's' ||
			direction === 'w'
		) {
			handleNextPosition(
				direction,
				moved,
				specialActive,
				setGhostMap,
				setMoved,
				setMap,
				setSpecialActive
			);
		}
	}, [direction, moved, setGhostMap, setMap, setSpecialActive, specialActive]);
}
