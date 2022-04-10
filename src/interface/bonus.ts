export interface Bonus {
	cmpScr: Array<string>;
	lifSstArdGbn: Array<string>;
	ardInptDt: Array<string>;
	lifSstArdCtnt: Array<string>;
}

export interface BonusAPI {
	id: string;
	name: string;
	cookies: string;
	thisYear: string;
	tmGbn: string;
}

export interface BonusSuccess {
	cmpScr: Array<string>;
	lifSstArdGbn: Array<string>;
	ardInptDt: Array<string>;
	lifSstArdCtnt: Array<string>;
}
