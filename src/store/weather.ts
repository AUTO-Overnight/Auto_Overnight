import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createRequestSaga } from '../hooks/createRequestSaga';
import { createAction } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import type { weather, AirPollutionAPI } from '../interface';
// import type { weather, weatherAPI, weatherSuccess } from '../interface';
import * as api from '../lib/api';
const initialState: weather = {
	pm10Value: 0, // 미세먼지 pm10 농도
	khaiValue: 0, //통합대기환경수치
	pm10Grade: 0,
};

const GET_AIRPOLLUTION = 'weather/GET_AIRPOLLUTION';

export const getAirPollution = createAction(GET_AIRPOLLUTION);

const getAirPollutionSaga = createRequestSaga(
	GET_AIRPOLLUTION,
	api.getAirPollution
);

export function* weatherSaga() {
	yield takeLatest(GET_AIRPOLLUTION, getAirPollutionSaga);
}

export const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {
		GET_AIRPOLLUTION_SUCCESS: (
			state,
			action: PayloadAction<AirPollutionAPI>
		) => {
			state.khaiValue = action.payload.response.body.items[0].khaiValue;
			state.pm10Grade = action.payload.response.body.items[0].pm10Grade;
			state.pm10Value = action.payload.response.body.items[0].pm10Value;
			console.log(action.payload);
		},
	},
});

export const {} = weatherSlice.actions;

export default weatherSlice.reducer;
