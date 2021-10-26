import client from './client';
import axios from 'axios';
import type { User } from '../../interface';
import { VERSION_URL } from '@env';
export const getLogin = ({ userId, userPw }: User) => {
	userId = encodeURIComponent(userId);
	userPw = encodeURIComponent(userPw);
	const user = JSON.stringify({
		id: userId,
		password: userPw,
	});
	return client.post('/login', user);
};

export const getVersion = () => {
	return axios.get(VERSION_URL);
};
