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
	outStayFrDtL: Array<any>;
	outStayToDt: Array<any>;
	outStayStGbn: Array<any>;
}

export interface DaySuccess {
	outStayFrDt: any;
	outStayToDt: any;
	outStayStGbn: any;
}
