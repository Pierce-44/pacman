import React from 'react';
import { ghostMapData } from '../util/mapData';

export default function useRemoveGhostFromPrison(
	setGhostMap: React.Dispatch<React.SetStateAction<string[][]>>
) {
	const [checkPrison, setCheckPrison] = React.useState(true);

	React.useEffect(() => {
		const constructorArr = ghostMapData.slice(11, -11);

		const prisonArr = constructorArr.map((subArr) => {
			const finalSubArr = subArr.slice(11, -11);
			return finalSubArr;
		});

		let stop = false;

		for (let i = 0; i < prisonArr.length && !stop; i++) {
			prisonArr[i].forEach((square, index) => {
				if (square !== 'a' && !stop) {
					stop = true;
					ghostMapData[i + 11][index + 11] = 'a';
					ghostMapData[9][13] = square;
					setGhostMap([...ghostMapData]);
				}
			});
		}

		setTimeout(() => setCheckPrison(!checkPrison), 10000);
	}, [checkPrison]);
}
