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
import type { CalendarAPI, Day, DaySuccess, setExist } from '../interface';
import constColors from '../constants/colors';
dayjs.extend(utc);
dayjs.extend(timezone);

function pushDayIsWeek({ state, day }) {
  const formDay = dayjs(day).format('YYYY-MM-DD');
  if (!state.day[formDay]) {
    state.sendDays.push(dayjs(day).format('YYYYMMDD'));
    state.count += 1;
    const dayNumber = dayjs(formDay).get('d');
    if (dayNumber === 0 || dayNumber === 6) {
      state.isWeekend.push(1);
    } else {
      state.isWeekend.push(0);
    }
    state.day[formDay] = {
      selected: true,
      // disableTouchEvent: false,
      color: state.isDarkMode
        ? constColors.calendarSelectedDarkColor
        : constColors.calendarSelectedColor,
      textColor: state.isDarkMode ? Colors.grey100 : Colors.black,

      textDayFontWeight: 900,
      delete: true,
    };
  }
}

function makeFirsOrLastDay({ state, day, isStartDay }) {
  const formDay = dayjs(day).format('YYYY-MM-DD');
  if (!state.day[formDay]) {
    state.sendDays.push(dayjs(day).format('YYYYMMDD'));
    state.count += 1;
    const dayNumber = dayjs(formDay).get('d');
    if (dayNumber === 0 || dayNumber === 6) {
      state.isWeekend.push(1);
    } else {
      state.isWeekend.push(0);
    }
    state.day[formDay] = {
      startingDay: isStartDay === true && true,
      endingDay: isStartDay === false && true,
      color: state.isDarkMode
        ? constColors.calendarSelectedDarkColor
        : constColors.calendarSelectedColor,
      textColor: state.isDarkMode ? Colors.grey100 : Colors.black,
      textDayFontWeight: 900,
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
  isDarkMode: null,
  count: 0,
  confirmList: [],
  lastSubmitDay: '',
  sendSortDays: [],
  calendarModalVisible: false,
  lastDayText: '',
  calendarModalMode: 'initial',
  updateModalVisible: false,
};

const SEND_DATES = 'calendar/SEND_DATES';

export const sendDates = createAction(
  SEND_DATES,
  (dates: CalendarAPI) => dates,
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
    logoutInitial: (state) => {
      state.sendDays = [];
      state.data = [];
      state.day = {};
      state.isWeekend = [];
      state.sendResponse = {};
      state.prepare = false;
      state.outStayFrDtLCal = [];
      state.outStayToDtCal = [];
      state.outStayStGbnCal = [];
      state.mode = 'day';
      state.isDarkMode = null;
      state.count = 0;
      state.confirmList = [];
    },
    SEND_DATES_SUCCESS: (state, action: PayloadAction<DaySuccess>) => {
      state.outStayFrDtLCal = action.payload.outStayFrDt;
      state.outStayStGbnCal = action.payload.outStayStGbn;
      state.outStayToDtCal = action.payload.outStayToDt;
      // Alert.alert(`${state.lastSubmitDay}`);
    },
    addDay: (state, action: PayloadAction<any>) => {
      const today = action.payload;
      const prevDay = dayjs(today).subtract(1, 'd').format('YYYY-MM-DD');
      const tomorrowDay = dayjs(today).add(1, 'd').format('YYYY-MM-DD');
      if (state.day[today]) {
        if (state.day[today].delete) {
          delete state.day[today], (state.count -= 1);
          // prettier-ignore
          if (state.day[prevDay]?.color) state.day[prevDay] = { ...state.day[prevDay], endingDay: true };
          // prettier-ignore
          if (state.day[tomorrowDay]?.color) state.day[tomorrowDay] = {...state.day[tomorrowDay], startingDay: true};
          if (state.day[prevDay]?.color && state.day[tomorrowDay]?.color) {
            state.day[tomorrowDay] = {
              ...state.day[tomorrowDay],
              startingDay: true,
            };
            state.day[prevDay] = {
              ...state.day[prevDay],
              endingDay: true,
            };
          }
        }
      } else {
        state.count += 1;

        state.day[today] = {
          color: state.isDarkMode
            ? constColors.calendarSelectedDarkColor
            : constColors.calendarSelectedColor,
          textColor: state.isDarkMode ? Colors.grey100 : Colors.black,
          startingDay: true,
          endingDay: true,

          disableTouchEvent: false,

          delete: true,
        };
        if (state.day[prevDay]?.color) {
          state.day[prevDay] = {
            ...state.day[prevDay],
            endingDay: false,
          };
          state.day[today] = {
            ...state.day[today],
            startingDay: false,
          };
        }
        if (state.day[tomorrowDay]?.color) {
          state.day[tomorrowDay] = {
            ...state.day[tomorrowDay],
            startingDay: false,
          };
          state.day[today] = {
            ...state.day[today],
            endingDay: false,
          };
        }
        if (state.day[prevDay]?.color && state.day[tomorrowDay]?.color) {
          state.day[today] = {
            ...state.day[today],
            startingDay: false,
            endingDay: false,
          };
        }
      }
    },
    makeCountZero: (state) => {
      state.count = 0;
    },
    addDayList: (
      state,
      action: PayloadAction<{ weekKey: number; weekDay: any }>,
    ) => {
      state.sendDays = [];
      state.isWeekend = [];
      let day = action.payload.weekDay;
      switch (action.payload.weekKey) {
        case 1:
          pushDayIsWeek({ state, day });
          break;
        case 2:
          makeFirsOrLastDay({ state, day, isStartDay: true });
          day = Number(dayjs(day).add(1, 'd'));
          for (let i = 1; i < 7 * 1 - 1; i++) {
            pushDayIsWeek({ state, day });
            day = Number(dayjs(day).add(1, 'd'));
          }
          makeFirsOrLastDay({ state, day, isStartDay: false });
          day = Number(dayjs(day).add(1, 'd'));
          break;
        case 3:
          makeFirsOrLastDay({ state, day, isStartDay: true });
          day = Number(dayjs(day).add(1, 'd'));
          for (let i = 1; i < 7 * 2 - 1; i++) {
            pushDayIsWeek({ state, day });
            day = Number(dayjs(day).add(1, 'd'));
          }
          makeFirsOrLastDay({ state, day, isStartDay: false });
          day = Number(dayjs(day).add(1, 'd'));
          break;
        case 4:
          makeFirsOrLastDay({ state, day, isStartDay: true });
          day = Number(dayjs(day).add(1, 'd'));
          for (let i = 1; i < 7 * 4 - 1; i++) {
            pushDayIsWeek({ state, day });
            day = Number(dayjs(day).add(1, 'd'));
          }
          makeFirsOrLastDay({ state, day, isStartDay: false });
          day = Number(dayjs(day).add(1, 'd'));
          break;
      }
    },
    sendPrepare: (state) => {
      const data = state.data;
      const day = state.day;
      data.map((date) => {
        delete day[dayjs(date).format('YYYY-MM-DD')];
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
      const sortDay = state.sendDays.sort((a, b) => a - b);

      state.lastSubmitDay = sortDay[sortDay.length - 1];

      state.lastDayText = `마지막 신청일 ${state.lastSubmitDay.slice(
        4,
        6,
      )}월 ${state.lastSubmitDay.slice(6, 8)}일에 \n켈린더 알람을 설정 할까요?`;
      state.calendarModalVisible = true;
      state.prepare = true;
    },
    togglePrepare: (state) => {
      state.prepare = false;
    },
    setExistDays: (state, action: PayloadAction<setExist>) => {
      state.data = action.payload.successList;
      state.confirmList = action.payload.isConfirmArray;
      state.data?.map((date) => {
        const setDay = dayjs(String(date)).format('YYYY-MM-DD');
        state.day[setDay] = {
          marked: true,
          dotColor: state.isDarkMode ? Colors.red500 : '#005EFC',
          activeOpacity: 0,
          delete: false,
        };
      });
      if (!state.confirmList) return;
      state.confirmList.map((date, index) => {
        if (date.isConfirm) {
          const setDay = dayjs(String(date.day)).format('YYYY-MM-DD');
          // if(date.isConfirm)

          state.day[setDay] = {
            marked: true,
            dotColor: state.isDarkMode ? Colors.yellow500 : Colors.red500,
            activeOpacity: 0,
            delete: false,
          };
        }
      });
    },
    removeAllDays: (state) => {
      state.day = {};
    },
    setMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload;
    },
    toggleDark: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setCalendarModalVisible: (state, action: PayloadAction<boolean>) => {
      state.calendarModalVisible = action.payload;
    },
    setCalendarModalMode: (state, action: PayloadAction<string>) => {
      state.calendarModalMode = action.payload;
    },
    setUpdateModalVisible: (state, action: PayloadAction<boolean>) => {
      state.updateModalVisible = action.payload;
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
  toggleDark,
  makeCountZero,
  logoutInitial,
  setCalendarModalVisible,
  setCalendarModalMode,
  setUpdateModalVisible,
} = calendarSlice.actions;

export default calendarSlice.reducer;
