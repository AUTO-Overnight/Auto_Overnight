export interface Bonus {
	cmpScr: Array<string>;
	lifSstArdGbn: Array<string>;
	ardInptDt: Array<string>;
	lifSstArdCtnt: Array<string>;
}

export interface BonusAPI {
	year: string;
	tmGbn: string;
	id: string;
	name: string;
	cookies: string;
}

export interface BonusSuccess {
	cmpScr: Array<string>;
	lifSstArdGbn: Array<string>;
	ardInptDt: Array<string>;
	lifSstArdCtnt: Array<string>;
}
