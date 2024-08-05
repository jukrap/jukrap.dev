import { useState, useEffect } from 'react';

const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkIsMobile = () => {
			const userAgent =
				navigator.userAgent || navigator.vendor || (window as any).opera;
			const mobileRegex =
				/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
			setIsMobile(mobileRegex.test(userAgent));
		};

		checkIsMobile();
		window.addEventListener('resize', checkIsMobile);

		return () => {
			window.removeEventListener('resize', checkIsMobile);
		};
	}, []);

	return isMobile;
};

export default useIsMobile;
