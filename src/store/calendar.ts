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

function pushDayIsWeek({ state, day }) {
	const formDay = dayjs(day).format('YYYY-MM-DD');
	if (!state.day[formDay]) {
		state.sendDays.push(dayjs(day).format('YYYYMMDD'));
		state.day[formDay] = {
			selected: true,
			disableTouchEvent: false,
			selectedColor: Colors.red100,
			selectedTextColor: Colors.black,
			delete: true,
		};
	}
}

const initialState: Day = {
	day: {},
	today: dayjs().tz('Asia/Seoul').locale('ko').format('YYYY-MM-DD'),
	sendDays: [],
	data: [],
	isWeekend: [],
	sendResponse: {},
	prepare: false,
	outStayFrDtLCal: [],
	outStayToDtCal: [],
	outStayStGbnCal: [],
	mode: 'day',
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
			state.sendDays = [];
			state.isWeekend = [];
		},
		SEND_DATES_SUCCESS: (state, action: PayloadAction<DaySuccess>) => {
			state.outStayFrDtLCal = action.payload.outStayFrDt;
			state.outStayStGbnCal = action.payload.outStayStGbn;
			state.outStayToDtCal = action.payload.outStayToDt;
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
		addDayList: (
			state,
			action: PayloadAction<{ weekKey: number; weekDay: any }>
		) => {
			state.sendDays = [];
			state.isWeekend = [];
			let day = action.payload.weekDay;
			console.log(day, action.payload.weekDay, action.payload.weekKey);
			switch (action.payload.weekKey) {
				case 1:
					pushDayIsWeek({ state, day });
					break;
				case 2:
					for (let i = 0; i <= 7 * 1; i++) {
						pushDayIsWeek({ state, day });
						day = Number(dayjs(day).add(1, 'd'));
					}
					break;
				case 3:
					for (let i = 0; i <= 7 * 2; i++) {
						pushDayIsWeek({ state, day });
						day = Number(dayjs(day).add(1, 'd'));
					}
					break;
				case 4:
					for (let i = 0; i <= 7 * 4; i++) {
						pushDayIsWeek({ state, day });
						day = Number(dayjs(day).add(1, 'd'));
					}
					break;
			}
			console.log(state.isWeekend);
			console.log(state.sendDays);
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
		setExistDays: (state, action: PayloadAction<Array<number>>) => {
			state.data = action.payload;
			state.data.map((date) => {
				const setDay = dayjs(String(date)).format('YYYY-MM-DD');
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
		setMode: (state, action: PayloadAction<string>) => {
			state.mode = action.payload;
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
	addDayList,
	setMode,
} = calendarSlice.actions;

export default calendarSlice.reducer;
