import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
export function useClock() {
	const [time, setTime] = useState(dayjs().format('A hh mm ss')); // -1-
	useEffect(() => {
		const id = setTimeout(() => {
			setTime(dayjs().format('A hh mm ss'));
		}, 1000);
		return () => clearTimeout(id);
	}, []);

	return time;
}
