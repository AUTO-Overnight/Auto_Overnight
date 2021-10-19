import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createRequestSaga } from '../hooks/createRequestSaga';
import { createAction } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import type { weather, AirPollutionAPI, weatherAPI } from '../interface';
import dayjs from 'dayjs';
// import type { weather, weatherAPI, weatherSuccess } from '../interface';
import * as api from '../lib/api';
const initialState: weather = {
	pm10Value: 0, // 미세먼지 pm10 농도
	khaiValue: 0, //통합대기환경수치
	pm10Grade: 1,
	current: {
		dt: '',
		temp: 0,
		weather: { main: '' },
	},
	daily: [],
	hourly: [],
};

const GET_AIRPOLLUTION = 'weather/GET_AIRPOLLUTION';
const GET_WEATHER = 'weather/GET_WEATHER';

export const getAirPollution = createAction(GET_AIRPOLLUTION);
export const getWeather = createAction(GET_WEATHER);

const getAirPollutionSaga = createRequestSaga(
	GET_AIRPOLLUTION,
	api.getAirPollution
);
const getWeatherSaga = createRequestSaga(GET_WEATHER, api.getWeather);

export function* weatherSaga() {
	yield takeLatest(GET_AIRPOLLUTION, getAirPollutionSaga);
	yield takeLatest(GET_WEATHER, getWeatherSaga);
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
		GET_WEATHER_SUCCESS: (state, action: PayloadAction<weatherAPI>) => {
			state.current = action.payload.current;
			state.daily = action.payload.daily;
			state.hourly = action.payload.hourly;
			let dayUnix = Number(state.current.dt);
			state.current.dt = dayjs.unix(dayUnix).format('MM-DD');
			state.current.temp = Math.floor(state.current.temp - 273.15);
			state.daily.map(
				(day) => (
					(dayUnix = Number(day.dt)),
					(day.temp.day = Math.floor(day.temp.day - 273.15)),
					(day.temp.max = Math.floor(day.temp.max - 273.15)),
					(day.temp.min = Math.floor(day.temp.min - 273.15)),
					(day.dt = dayjs.unix(dayUnix).format('MM-DD'))
				)
			);
			state.hourly.map(
				(hour) => (
					(dayUnix = Number(hour.dt)),
					(hour.temp = Math.floor(hour.temp - 273.15)),
					(hour.dt = dayjs.unix(dayUnix).format('DD-HH'))
				)
			);
		},
	},
});

export const {} = weatherSlice.actions;

export default weatherSlice.reducer;
