export interface Login {
	id: string;
	pw: string;
	loginState: loginState;
	rememberID: string;
	cookieTime: any;
	version: number;
	versionOK: boolean;
	name: string;
	tmGbn: string;
	thisYear: string;
	isDarkMode: boolean;
	color: {
		themeColor: string;
		backgroundColor: string;
		submitButtonColor: string;
		removeButtonColor: string;
		smallButtonColor: string;
	};
	loginErrorModalVisible: boolean;
}

export interface loginState {
	cookies: string;
	loginError: string;
	outStayFrDtL: Array<any>;
	outStayStGbn: Array<any>;
	outStayToDt: Array<any>;

	data: {};
	successList: Array<any>;
	isConfirmArray: Array<any>;
}

export interface confirm {
	day: string;
	isConfirm: boolean;
}
export interface updateStay {
	outStayFrDtLCal?: Array<any>;
	outStayToDtCal?: Array<any>;
	outStayStGbnCal?: Array<any>;
}

export interface User {
	userId: string;
	userPw: string;
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
