import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
export function useClock() {
	const [time, setTime] = useState(dayjs().format('HH:mm')); // -1-
	useEffect(() => {
		const id = setTimeout(() => {
			setTime(dayjs().format('HH:mm'));
		}, 1000);
		return () => clearTimeout(id);
	}, []);

	return time;
}
