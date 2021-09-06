import type { BonusSuccess } from '../interface';
export function makeBonusArray({
	ardInptDt,
	cmpScr,
	lifSstArdCtnt,
	lifSstArdGbn,
}: BonusSuccess) {
	const bonusList = [];
	let sum = 0;
	for (let i = 0; i < ardInptDt.length; i++) {
		let data = [];
		if (lifSstArdGbn[i] === '1') data.push('상점');
		else data.push('벌점');
		data.push(cmpScr[i], ardInptDt[i], lifSstArdCtnt[i]);
		sum += Number(cmpScr[i]);
		bonusList.push(data);
	}
	if (ardInptDt.length) {
		let data = [];
		data.push('합산');
		data.push(sum, '⭐️', '');
		bonusList.push(data);
	}

	return bonusList;
}
