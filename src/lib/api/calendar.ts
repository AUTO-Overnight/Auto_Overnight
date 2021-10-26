import client from './client';
import type { CalendarAPI } from '../../interface';
export const sendDates = ({
	id,
	isWeekend,
	sendingToday,
	dateList,
	cookies,
}: CalendarAPI) => {
	const dates = JSON.stringify({
		date_list: dateList,
		is_weekend: isWeekend,
		outStayAplyDt: sendingToday,
		cookies: cookies,
	});
	return client.post('/sendstayout', dates);
};
