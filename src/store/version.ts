import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createRequestSaga } from '../hooks';
import * as api from '../lib/api/login';
import { takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import type {
	Login,
	User,
	LoginResponse,
	updateStay
} from '../interface/login';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);
export const initialState = {
	version: 105
};

const GET_VERSION = 'version/GET_VERSION';

export const getVersion = createAction(GET_VERSION);

const getVersionSaga = createRequestSaga(GET_VERSION, api.getVersion);

export function* versionSaga() {
	yield takeLatest(GET_VERSION, getVersionSaga);
}

export const versionSlice = createSlice({
	name: 'version',
	initialState,
	reducers: {
		GET_VERSION_SUCCESS: (state, action: PayloadAction<any>) => {
			if (state.version == action.payload) {
				state.versionOK = true;
			}
		}
	},
	extraReducers: {}
});

export const {} = versionSlice.actions;

export default versionSlice.reducer;
