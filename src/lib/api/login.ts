import client from './client';
import axios from 'axios';
import type { User } from '../../interface';

export const getLogin = ({ userId, userPw }: User) => {
  userId = encodeURIComponent(userId);
  userPw = encodeURIComponent(userPw);
  const user = JSON.stringify({
    id: userId,
    password: userPw,
  });
  return client.post('/login', user);
};
