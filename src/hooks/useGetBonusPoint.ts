import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BonusAPI } from '../interface';
import { RootState } from '../store';
import { getBonus } from '../store/bonus';

export function useGetBonusPoint(): Object {
	//prettier-ignore
	const {
		year,
		tmGbn,
		id,
		name,
		cookies,
		cmpScr,
		lifSstArdGbn,
		ardInptDt,
		lifSstArdCtnt,
	} = useSelector(({ login, bonus }: RootState) => ({
		year: login.thisYear,
		tmGbn: login.tmGbn,
		id: login.id,
		name: login.name,
		cookies: login.cookies,
		cmpScr: bonus.cmpScr,
		lifSstArdGbn: bonus.lifSstArdGbn,
		ardInptDt: bonus.ardInptDt,
		lifSstArdCtnt: bonus.lifSstArdCtnt,
	}));
	const dispatch = useDispatch();
	useEffect(() => {
		const data: BonusAPI = {
			cookies: cookies,
			id: id,
			name: name,
			year: year,
			tmGbn: tmGbn,
		};
		dispatch(getBonus(data));
	}, [cookies, id, name, year, tmGbn]);
	return { cmpScr, lifSstArdGbn, ardInptDt, lifSstArdCtnt };
}
