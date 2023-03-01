import client from './client';
import type { BonusAPI } from '../../interface';
export const getBonus = ({ id, name, cookies, thisYear, tmGbn }: BonusAPI) => {
  const data = JSON.stringify({
    userNm: name,
    cookies: cookies,
    yy: thisYear,
    tmGbn,
  });
  return client.post('/find/point', data);
};
