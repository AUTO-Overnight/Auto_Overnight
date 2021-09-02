import type { BonusSuccess } from '../interface';
export function makeBonusArray({
	ardInptDt,
	cmpScr,
	lifSstArdCtnt,
	lifSstArdGbn,
}: BonusSuccess) {
	const bonusList = [];
	for (let i = 0; i < ardInptDt.length; i++) {
		let data = [];
		if (lifSstArdGbn[i] === '1') data.push('상점');
		else data.push('벌점');
		data.push(cmpScr[i], ardInptDt[i], lifSstArdCtnt[i]);
		bonusList.push(data);
	}
	return bonusList;
}
