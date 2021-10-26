import client from './client';
import type { BonusAPI } from '../../interface';
export const getBonus = ({ id, name, cookies }: BonusAPI) => {
	const data = JSON.stringify({
		userNm: name,
		cookies: cookies,
	});
	return client.post('/findpointlist', data);
};
