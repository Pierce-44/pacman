/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

interface Props {
	up: string;
	down: string;
	left: string;
	right: string;
}

export default function useCheckDirection({ up, down, left, right }: Props) {
	const [keyPressed, setKeyPressed] = React.useState('false');

	// If pressed key is our target key then set key value
	function downHandler({ key }: { key: any }) {
		if (key === up || key === down || key === left || key === right) {
			setKeyPressed(key);
		}
	}

	React.useEffect(() => {
		window.addEventListener('keydown', downHandler);

		return () => {
			window.removeEventListener('keydown', downHandler);
		};
	}, []);
	return keyPressed;
}
