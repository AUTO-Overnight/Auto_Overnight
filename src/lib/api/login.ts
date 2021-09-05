import client from './client';
import type { User } from '../../interface';
export const getLogin = ({ userId, userPw }: User) => {
	const user = JSON.stringify({
		id: userId,
		password: userPw,
	});
	return client.post('/login', user);
};
