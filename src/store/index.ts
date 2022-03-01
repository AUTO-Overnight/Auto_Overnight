import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import calendar, { calendarSaga } from './calendar';
import loading from './loading';
import login, { loginSaga } from './login';
import bonus, { bonusSaga } from './bonus';
import weather, { weatherSaga } from './weather';
// import storageSession from 'redux-persist/lib/storage/session';
const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	blacklist: ['calendar', 'bonus']
};
const rootReducer = combineReducers({
	login,
	loading,
	calendar,
	bonus,
	weather
});
export default persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
	yield all([loginSaga(), calendarSaga(), bonusSaga(), weatherSaga()]);
}
