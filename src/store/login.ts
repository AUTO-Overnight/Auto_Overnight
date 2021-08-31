import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createRequestSaga } from '../hooks';
import * as api from '../lib/api/login';
import { takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import type { Login, User, LoginResponse } from '../interface/login';

const initialState: Login = {
	id: '',
	pw: '',
	cookies: '',
	loginError: '',
	dateList: [],
	isSuccess: [],
	semester: '',
	thisYear: '',
	data: {},
	name: '',
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
			state.loginError = '';
			state.cookies = '';
			state.name = '';
			state.dateList = [];
			state.isSuccess = [];
			state.loginError = '';
		},
		logoutHome: (state) => {
			state.id = '';
			state.pw = '';
			state.loginError = '';
			state.cookies = '';
			state.name = '';
			state.dateList = [];
			state.isSuccess = [];
			state.loginError = '';
		},
		GET_LOGIN_SUCCESS: (state, action: PayloadAction<LoginResponse>) => {
			state.cookies = action.payload.cookies;
			state.name = action.payload.name;
			state.isSuccess = action.payload.outStayStGbn;
			state.dateList = action.payload.outStayToDt;
			state.thisYear = action.payload.yy;
		},
		GET_LOGIN_FAILURE: (state, action: PayloadAction<any>) => {
			state.loginError = action.payload;
		},
		setIdPw: (state, action: PayloadAction<User>) => {
			state.id = action.payload.id;
			state.pw = action.payload.pw;
		},
	},
	extraReducers: {},
});

export const {
	GET_LOGIN_SUCCESS,
	GET_LOGIN_FAILURE,
	initialLogin,
	setIdPw,
	logoutHome,
} = loginSlice.actions;

export default loginSlice.reducer;
