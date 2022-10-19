import React from 'react';

export default function useHandleSpecial(
	specialActive: boolean,
	setSpecialActive: React.Dispatch<React.SetStateAction<boolean>>
) {
	React.useEffect(() => {
		if (specialActive) {
			setTimeout(() => setSpecialActive(false), 7000);
		}
	}, [specialActive, setSpecialActive]);
}
