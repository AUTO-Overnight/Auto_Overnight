import client from './client';
import type { BonusAPI } from '../../interface';
export const getBonus = ({ id, name, tmGbn, year, cookies }: BonusAPI) => {
	const data = JSON.stringify({
		yy: year,
		tmGbn: tmGbn,
		schregNo: id,
		userNm: name,
		cookies: cookies,
	});
	return client.post('/findpointlist', data);
};
