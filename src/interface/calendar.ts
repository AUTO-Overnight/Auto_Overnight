export interface CalendarAPI {
	dateList: Array<any>;
	isWeekend: Array<any>;
	sendingToday: string;
	id: string;
	cookies: string;
}

export interface Day {
	day: Object;
	today: any;
	sendDays: Array<any>;
	isWeekend: Array<any>;
	data: Array<any>;
	sendResponse: any;
	prepare: boolean;
	outStayFrDtLCal: Array<any>;
	outStayToDtCal: Array<any>;
	outStayStGbnCal: Array<any>;
	mode: string;
}

export interface DaySuccess {
	outStayFrDt: any;
	outStayToDt: any;
	outStayStGbn: any;
}
