import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createRequestSaga } from '../hooks/createRequestSaga';
import { createAction } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import type { Bonus, BonusAPI, BonusSuccess } from '../interface';
import * as api from '../lib/api';
const initialState: Bonus = {
	ardInptDt: [],
	cmpScr: [],
	lifSstArdCtnt: [],
	lifSstArdGbn: [],
};

const GET_BONUS = 'bonus/GET_BONUS';

export const getBonus = createAction(GET_BONUS, (bonus: BonusAPI) => bonus);

const getBonusSaga = createRequestSaga(GET_BONUS, api.getBonus);

export function* bonusSaga() {
	yield takeLatest(GET_BONUS, getBonusSaga);
}

export const bonusSlice = createSlice({
	name: 'bonus',
	initialState,
	reducers: {
		GET_BONUS_SUCCESS: (state, action: PayloadAction<BonusSuccess>) => {
			state.ardInptDt = action.payload.ardInptDt;
			state.cmpScr = action.payload.cmpScr;
			state.lifSstArdCtnt = action.payload.lifSstArdCtnt;
			state.lifSstArdGbn = action.payload.lifSstArdGbn;
		},
	},
});

export const {} = bonusSlice.actions;

export default bonusSlice.reducer;
