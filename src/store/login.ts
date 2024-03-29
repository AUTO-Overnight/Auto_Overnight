import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createRequestSaga } from '../hooks';
import * as api from '../lib/api/login';
import { takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import type {
  Login,
  User,
  LoginResponse,
  updateStay,
} from '../interface/login';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);

export const initialState: Login = {
  id: '',
  pw: '',
  name: '',
  tmGbn: '',
  thisYear: '',
  isDarkMode: false,
  loginState: {
    cookies: '',
    loginError: '',
    outStayFrDtL: [],
    outStayStGbn: [],
    outStayToDt: [],
    data: {},
    successList: [],
    isConfirmArray: [],
  },
  rememberID: '',
  cookieTime: '',
  version: 105,
  versionOK: false,
  color: {
    themeColor: '#fff',
    backgroundColor: '#FFF',
    submitButtonColor: '#FFF',
    removeButtonColor: '#fff',
    smallButtonColor: '#fff',
  },
  loginErrorModalVisible: false,
};

const GET_LOGIN = 'login/GET_LOGIN';

export const getLogin = createAction(GET_LOGIN, (user: User) => user);

const getLoginSaga = createRequestSaga(GET_LOGIN, api.getLogin);

export function* loginSaga() {
  yield takeLatest(GET_LOGIN, getLoginSaga);
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    initialLogin: (state) => {
      state.loginState.cookies = '';
      state.loginState.loginError = '';
      state.loginState.outStayFrDtL = [];
      state.loginState.outStayStGbn = [];
      state.loginState.outStayToDt = [];
      state.tmGbn = '';
      state.thisYear = '';
      state.loginState.data = {};
      state.name = '';
      state.loginState.successList = [];
      state.loginState.isConfirmArray = [];
      state.loginState.loginError = '';
    },
    toggleRemember: (state, action: PayloadAction<string>) => {
      state.rememberID = action.payload;
    },
    GET_LOGIN_SUCCESS: (state, action: PayloadAction<LoginResponse>) => {
      const {
        cookies,
        name,
        outStayFrDt,
        outStayStGbn,
        outStayToDt,
        tmGbn,
        yy,
      } = action.payload;
      state.loginState.cookies = cookies;
      state.name = name;
      state.loginState.outStayStGbn = outStayStGbn;
      state.loginState.outStayToDt = outStayToDt;
      state.loginState.outStayFrDtL = outStayFrDt;
      state.thisYear = yy;
      state.tmGbn = tmGbn;
      state.cookieTime = dayjs().tz('Asia/Seoul').locale('ko');
      state.loginState.loginError = '';
    },
    GET_LOGIN_FAILURE: (state, action: PayloadAction<any>) => {
      state.loginState.loginError = action.payload;
    },
    makeSuccessList: (state, action: PayloadAction<updateStay>) => {
      if (action.payload.outStayFrDtLCal.length) {
        state.loginState.outStayToDt = action.payload.outStayToDtCal;
        state.loginState.outStayFrDtL = action.payload.outStayFrDtLCal;
        state.loginState.outStayStGbn = action.payload.outStayStGbnCal;
      }
      let len: number;
      if (state.loginState.outStayFrDtL)
        len = state.loginState.outStayFrDtL.length;
      // let day: any;
      state.loginState.successList = [];
      state.loginState.isConfirmArray = [];
      for (let i = 0; i < len; i++) {
        if (
          state.loginState.outStayToDt[i] === state.loginState.outStayFrDtL[i]
        ) {
          // 시작 일 끝 일 같은 경우
          state.loginState.successList.push(state.loginState.outStayToDt[i]);
          if (state.loginState.outStayStGbn[i] === '2') {
            state.loginState.isConfirmArray.push({
              day: state.loginState.outStayToDt[i],
              isConfirm: true,
            });
          } else {
            state.loginState.isConfirmArray.push({
              day: state.loginState.outStayToDt[i],
              isConfirm: false,
            });
          }
          // if()
        }
        // state.isConfirmArray.push({})
        else {
          const diff = Number(
            dayjs(state.loginState.outStayToDt[i]).diff(
              state.loginState.outStayFrDtL[i],
              'd',
            ),
          );
          for (let j = 0; j <= diff; j++) {
            let day = dayjs(state.loginState.outStayFrDtL[i])
              .add(j, 'd')
              .format('YYYYMMDD');
            state.loginState.successList.push(day);
            if (state.loginState.outStayStGbn[i] === '2') {
              state.loginState.isConfirmArray.push({
                day: day,
                isConfirm: true,
              });
            } else {
              state.loginState.isConfirmArray.push({
                day: day,
                isConfirm: false,
              });
            }
          }
        }
      }
    },
    setIdPw: (state, action: PayloadAction<User>) => {
      state.id = action.payload.userId;
      state.pw = action.payload.userPw;
    },
    setCookieTime: (state, action: PayloadAction<any>) => {
      state.cookieTime = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setLoginErrorModalVisible: (state, action: PayloadAction<boolean>) => {
      state.loginErrorModalVisible = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  initialLogin,
  makeSuccessList,
  setCookieTime,
  setIdPw,
  toggleRemember,
  setDarkMode,
  setLoginErrorModalVisible,
} = loginSlice.actions;

export default loginSlice.reducer;
