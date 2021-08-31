import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createRequestSaga } from '../hooks';
import { createAction } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import { Colors } from 'react-native-paper';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import * as api from '../lib/api';
import type { CalendarAPI, Day, DaySuccess } from '../interface';
dayjs.extend(utc);
dayjs.extend(timezone);

const initialState: Day = {
	day: {},
	today: dayjs().tz('Asia/Seoul').locale('ko').format('YYYY-MM-DD'),
	sendDays: [],
	data: [],
	isWeekend: [],
	sendResponse: {},
	prepare: false,
	outStayFrDtL: [],
	outStayToDt: [],
	outStayStGbn: [],
};

const SEND_DATES = 'calendar/SEND_DATES';

export const sendDates = createAction(
	SEND_DATES,
	(dates: CalendarAPI) => dates
);

const sendDatesSaga = createRequestSaga(SEND_DATES, api.sendDates);

export function* calendarSaga() {
	yield takeLatest(SEND_DATES, sendDatesSaga);
}

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		initial: (state) => {
			state.day = {};
		},
		SEND_DATES_SUCCESS: (state, action: PayloadAction<DaySuccess>) => {
			state.outStayFrDtL = action.payload.outStayFrDt;
			state.outStayStGbn = action.payload.outStayStGbn;
			state.outStayToDt = action.payload.outStayToDt;
		},
		addDay: (state, action: PayloadAction<any>) => {
			if (state.day[action.payload]) {
				if (state.day[action.payload].delete) delete state.day[action.payload];
			} else {
				state.day[action.payload] = {
					selected: true,
					disableTouchEvent: false,
					selectedColor: Colors.red100,
					selectedTextColor: Colors.black,
					delete: true,
				};
			}
		},
		sendPrepare: (state) => {
			const data = state.data;
			const day = state.day;
			data.map((date) => {
				const setDay = dayjs(date).format('YYYY-MM-DD');
				delete day[setDay];
			});
			const pushDays = Object.keys(day);
			state.sendDays = [];
			state.isWeekend = [];
			console.log(pushDays);
			pushDays.map((day) => {
				if (day) {
					state.sendDays.push(dayjs(day).format('YYYYMMDD'));
					const dayNumber = Number(dayjs(day).day);
					if (dayNumber === 0 || dayNumber === 6) {
						state.isWeekend.push(1);
					} else {
						state.isWeekend.push(0);
					}
				}
			});
			state.prepare = true;
		},
		togglePrepare: (state) => {
			state.prepare = false;
		},
		setExistDays: (state, action: PayloadAction<any>) => {
			// const days = Object.values(action.payload);
			state.data = action.payload;
			state.data.map((date) => {
				const setDay = dayjs(date).format('YYYY-MM-DD');
				state.day[setDay] = {
					marked: true,
					dotColor: 'red',
					activeOpacity: 0,
					delete: false,
				};
			});
		},
		removeAllDays: (state) => {
			state.day = {};
		},
	},
});

export const {
	addDay,
	removeAllDays,
	setExistDays,
	initial,
	sendPrepare,
	togglePrepare,
} = calendarSlice.actions;

export default calendarSlice.reducer;
