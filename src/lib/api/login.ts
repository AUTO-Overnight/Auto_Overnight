import client from './client';
import type { Login } from '../../interface';
export const getLogin = ({ id, pw }: Login) => {
	const user = JSON.stringify({
		id: id,
		password: pw,
	});
	return client.post('/login', user);
};
