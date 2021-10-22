import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createRequestSaga } from '../hooks/createRequestSaga';
import { createAction } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import type { weather, AirPollutionAPI, weatherAPI } from '../interface';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

// import type { weather, weatherAPI, weatherSuccess } from '../interface';
import * as api from '../lib/api';
import { Colors } from 'react-native-paper';
const initialState: weather = {
	pm10Value: 0, // 미세먼지 pm10 농도
	pm10Grade: 0,
	pm25Value: 0,
	pm25Grade: 0,
	current: {
		dt: '',
		temp: 0,
		weather: { main: '' },
	},
	daily: [],
	hourly: [],
	pm10: {
		backgroundColor: '',
		text: '',
	},
	pm25: {
		backgroundColor: '',
		text: '',
	},
	windowHeight: 0,
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
			state.pm25Grade = Number(action.payload.response.body.items[0].pm25Grade);
			state.pm25Value = action.payload.response.body.items[0].pm25Value;
			state.pm10Grade = Number(action.payload.response.body.items[0].pm10Grade);
			state.pm10Value = action.payload.response.body.items[0].pm10Value;
			if (state.pm10Grade === 1) {
				state.pm10.text = '좋음';
				state.pm10.backgroundColor = Colors.blue400;
			} else if (state.pm10Grade === 2) {
				state.pm10.text = '보통';
				state.pm10.backgroundColor = Colors.green400;
			} else if (state.pm10Grade === 3) {
				state.pm10.text = '나쁨';
				state.pm10.backgroundColor = Colors.yellow400;
			} else if (state.pm10Grade === 4) {
				state.pm10.text = '나쁨';
				state.pm10.backgroundColor = Colors.red400;
			}
			if (state.pm25Grade === 1) {
				state.pm25.text = '좋음';
				state.pm25.backgroundColor = Colors.blue400;
			} else if (state.pm25Grade === 2) {
				state.pm25.text = '보통';
				state.pm25.backgroundColor = Colors.green400;
			} else if (state.pm25Grade === 3) {
				state.pm25.text = '나쁨';
				state.pm25.backgroundColor = Colors.yellow400;
			} else if (state.pm25Grade === 4) {
				state.pm25.text = '나쁨';
				state.pm25.backgroundColor = Colors.red400;
			}
		},
		GET_WEATHER_SUCCESS: (state, action: PayloadAction<weatherAPI>) => {
			state.current = action.payload.current;
			state.daily = action.payload.daily;
			state.hourly = action.payload.hourly;
			let dayUnix = Number(state.current.dt);
			state.current.dt = dayjs.unix(dayUnix).format('HH');
			state.current.temp = Math.floor(state.current.temp - 273.15);
			state.daily = state.daily.slice(0, 6);
			state.hourly = state.hourly.slice(0, 12);
			state.daily.map(
				(day) => (
					(dayUnix = Number(day.dt)),
					(day.temp.day = Math.floor(day.temp.day - 273.15)),
					(day.temp.max = Math.floor(day.temp.max - 273.15)),
					(day.temp.min = Math.floor(day.temp.min - 273.15)),
					(day.dt = dayjs.unix(dayUnix).format('DD - dd'))
				)
			);
			state.hourly.map(
				(hour) => (
					(dayUnix = Number(hour.dt)),
					(hour.temp = Math.floor(hour.temp - 273.15)),
					(hour.dt = dayjs.unix(dayUnix).format('HH'))
				)
			);
		},
		setWindowHeight: (state, action: PayloadAction<number>) => {
			state.windowHeight = action.payload;
		},
	},
});

export const { setWindowHeight } = weatherSlice.actions;

export default weatherSlice.reducer;
