import React from 'react';
import { mapData } from '../util/mapData';

interface Props {
	direction: string | boolean;
	setMap: React.Dispatch<React.SetStateAction<string[][]>>;
}

function handleNextPosition(
	direction: string,
	moved: boolean,
	setMoved: React.Dispatch<React.SetStateAction<boolean>>,
	setMap: React.Dispatch<React.SetStateAction<string[][]>>
) {
	function handleX(
		arrayInfo: string[],
		arrayNumber: number,
		directionFactor: number
	) {
		const checker =
			mapData[arrayNumber][arrayInfo.indexOf('P') + directionFactor];

		if ((arrayInfo.includes('P') && checker === 'e') || checker === 'o') {
			const x = arrayInfo.indexOf('P') + directionFactor;
			const y = arrayNumber;

			mapData[y][x - directionFactor] = 'e';
			mapData[y][x] = 'P';

			setMap([...mapData]);
			setTimeout(() => setMoved(!moved), 150);
		}
	}

	function handleY(
		arrayInfo: string[],
		arrayNumber: number,
		directionFactor: number
	) {
		const checker =
			mapData[arrayNumber + directionFactor]?.[arrayInfo.indexOf('P')];

		if ((arrayInfo.includes('P') && checker === 'e') || checker === 'o') {
			const x = arrayInfo.indexOf('P');
			const y = arrayNumber + directionFactor;

			mapData[arrayNumber][x] = 'e';
			mapData[y][x] = 'P';

			setMap([...mapData]);
			setTimeout(() => setMoved(!moved), 150);
		}
	}

	// stop is needed for when travelling negative Y, without this it jumps straight to the last Y value, this is because it updates the next sub array before the map gets rounded to reading it.
	let stop = false;

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

export default function useHandlePacManPosition({ direction, setMap }: Props) {
	const [moved, setMoved] = React.useState(false);

	React.useEffect(() => {
		if (
			direction === 'd' ||
			direction === 'a' ||
			direction === 's' ||
			direction === 'w'
		) {
			handleNextPosition(direction, moved, setMoved, setMap);
		}
	}, [direction, moved, setMap]);
}
