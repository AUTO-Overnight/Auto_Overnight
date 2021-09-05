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
	confirmList: Array<confirm>;
	sendResponse: any;
	prepare: boolean;
	outStayFrDtLCal: Array<any>;
	outStayToDtCal: Array<any>;
	outStayStGbnCal: Array<any>;
	mode: string;
	isDarkMode: boolean;
	count: number;
}

export interface DaySuccess {
	outStayFrDt: any;
	outStayToDt: any;
	outStayStGbn: any;
}

interface confirm {
	day: string;
	isConfirm: boolean;
}

export interface setExist {
	successList: Array<any>;
	isConfirmArray: Array<confirm>;
}
