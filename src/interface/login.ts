export interface Login {
	id: string;
	pw: string;
	cookies: string;
	loginError: string;
	thisYear: string;
	semester: string;
	dateList: Array<any>;
	isSuccess: Array<any>;
	data: any;
	name: string;
}

export interface User {
	id: string;
	pw: string;
}

export interface LoginResponse {
	cookies: string;
	name: string;
	yy: string; // 이번 년도
	tmGbn: string; // 학기
	outStayFrDt: Array<any>; // 외박 신청 시작일
	outStayToDt: Array<any>; // 외박 신청 종료일
	outStayStGbn: Array<any>; // 성공, 실패 여부
}
