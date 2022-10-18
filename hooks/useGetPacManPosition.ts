import React from 'react';

export default function useGetPacManPosition(map: string[][]) {
	const [x, setX] = React.useState<number>();
	const [y, setY] = React.useState<number>();

	React.useEffect(() => {
		const pacPositionX = map
			.map((arrayInfo) => {
				if (arrayInfo.includes('P')) {
					return arrayInfo.indexOf('P');
				}
			})
			.filter((x) => {
				if (typeof x === 'number') {
					return x;
				}
			});
		setX(pacPositionX[0]);

		const pacPositionY = map
			.map((arrayInfo, index) => {
				if (arrayInfo.includes('P')) {
					return index;
				}
			})
			.filter((x) => {
				if (typeof x === 'number') {
					return x;
				}
			});

		setY(pacPositionY[0]);
	}, [map]);

	return { x, y };
}
