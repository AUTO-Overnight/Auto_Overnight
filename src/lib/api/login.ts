import axios from 'axios';
import type { Login } from '../../interface';
export const getLogin = ({ id, pw, token }: Login) => {
	const headers = {
		'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
		Authorization: `${token}`,
		Accept: '*/*',
	};
	const user = JSON.stringify({
		id: id,
		pw: pw,
	});
	return axios.post(`주소`, user, { headers });
};
