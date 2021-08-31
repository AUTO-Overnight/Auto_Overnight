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
		schregNo: id,
		cookies: cookies,
	});
	return client.post('/sendstayout', dates);
};

// import client from './client';
// import type { CalendarAPI } from '../../interface';
// export const sendDates = ({
// 	year,
// 	yearNum,
// 	gradeNum,
// 	name,
// 	cookies,
// }: CalendarAPI) => {
// 	const dates = JSON.stringify({
// 		yy: year,
// 		tmGbn: yearNum,
// 		schregNo: gradeNum,
// 		userNm: name,
// 		cookies: cookies,
// 	});
// 	return client.post('', dates);
// };
