/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import * as Notifications from 'expo-notifications';
// prettier-ignore
import {SafeAreaView, View, NavigationHeader, MaterialCommunityIcon as Icon, TouchableView, Text, MaterialIcon} from '../theme';
import {
	Buttons,
	ModalCalendar,
	ModalSetting,
	ModalUpdate
} from '../components';

import type { LeftRightNavigationMethods } from '../components';
import { Calendar } from '@react-native-calendars';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';

import { LocaleConfig } from '@react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import {
	addDay,
	addDayList,
	initial,
	logoutInitial,
	makeCountZero,
	sendDates,
	sendPrepare,
	setExistDays,
	setMode,
	setUpdateModalVisible,
	toggleDark,
	togglePrepare
} from '../store/calendar';
import type { RootState } from '../store';
import { useCalendarTheme } from '../hooks';
import { useModal } from '../components';
import { Colors } from 'react-native-paper';
import { getLogin, initialLogin, makeSuccessList } from '../store/login';
import { CalendarAPI } from '../interface';
import { TouchHeaderIconView } from '../theme/navigation/TouchHeaderIconView';
import * as Analytics from 'expo-firebase-analytics';
import constColors from '../constants/colors';
dayjs.extend(utc);
dayjs.extend(timezone);
//prettier-ignore
LocaleConfig.locales['ko'] = {
  monthNames: ['1 /', '2 / ', '3 /', '4 /', '5 /', '6 /', '7 /', '8 /', '9 /', '10 /', '11 /', '12 /'],
  monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['일','월','화','수','목','금','토'],
  
};
LocaleConfig.defaultLocale = 'ko';

const borderRadius = 12;

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false
	})
});

export default function Home() {
	const {
		day,
		sendDays,
		cookies,
		isWeekend,
		id,
		pw,
		prepare,
		outStayFrDtL,
		outStayToDt,
		outStayToDtCal,
		outStayFrDtLCal,
		outStayStGbnCal,
		outStayStGbn,
		successList,
		mode,
		count,
		data,
		isConfirmArray,
		cookieTime,
		rememberID,
		loadingCalendar,
		loadingLogin,
		name
	} = useSelector(({ calendar, login, loading }: RootState) => ({
		day: calendar.day,
		sendDays: calendar.sendDays,
		cookies: login.loginState.cookies,
		isWeekend: calendar.isWeekend,
		id: login.id,
		pw: login.pw,
		name: login.name,
		prepare: calendar.prepare,
		outStayToDt: login.loginState.outStayToDt,
		outStayFrDtL: login.loginState.outStayFrDtL,
		outStayStGbn: login.loginState.outStayStGbn,
		outStayToDtCal: calendar.outStayToDtCal,
		outStayFrDtLCal: calendar.outStayFrDtLCal,
		outStayStGbnCal: calendar.outStayStGbnCal,
		successList: login.loginState.successList,
		mode: calendar.mode,
		count: calendar.count,
		cookieTime: login.cookieTime,
		data: login.loginState.data,
		isConfirmArray: login.loginState.isConfirmArray,
		rememberID: login.rememberID,
		loadingCalendar: loading['calendar/SEND_DATES'],
		loadingLogin: loading['login/GET_LOGIN']
	}));

	const navigation = useNavigation();
	const dispatch = useDispatch();
	const goRight = useCallback(() => navigation.navigate('Point'), []);
	const [modalText, setModalText] = useState<string>('');
	const [modalTitle, setModalTitle] = useState<string>('');
	const [selectDay, setSelectDay] = useState('');
	const [loading, setLoading] = useState('normal');
	const { modalVisible, setModalVisible, ModalView } = useModal({
		text: modalText,
		title: modalTitle
	});
	const [select, setSelect] = useState(1);
	const open = useCallback(() => {
		navigation.dispatch(DrawerActions.openDrawer());
	}, []);
	const logout = useCallback(() => {
		// dispatch(logoutHome());
		dispatch(logoutInitial());

		navigation.navigate('Login');
	}, []);

	const leftRef = useRef<LeftRightNavigationMethods | null>(null);
	const flatListRef = useRef<FlatList | null>(null);

	const [today] = useState(
		dayjs().tz('Asia/Seoul').locale('ko').format('YYYY-MM-DD')
	);
	// prettier-ignore
	const [sendingToday] = useState(dayjs().tz('Asia/Seoul').locale('ko').format('YYYYMMDD'));
	const [maxDate] = useState(
		dayjs().tz('Asia/Seoul').locale('ko').add(45, 'd').format('YYYY-MM-DD')
	);
	// 설정 모달 창
	const [settingModalVisible, setSetting] = useState(false);
	const { theme, isDark } = useCalendarTheme();
	const backWhiteColor = isDark ? 'black' : '#F6F6F6';
	useEffect(() => {
		dispatch(setUpdateModalVisible(true));
	}, []);
	useEffect(() => {
		dispatch(toggleDark(isDark));
		onRemoveAllDays();
		return () => {
			dispatch(logoutInitial());
		};
	}, [isDark]);
	useEffect(() => {
		const timer = () => {
			setTimeout(() => {
				const time = dayjs().tz('Asia/Seoul').locale('ko');
				if (dayjs(time).isAfter(dayjs(cookieTime).add(2, 'hours'))) {
					if (rememberID === 'auto') {
						dispatch(initialLogin());
						const user = {
							userId: id,
							userPw: pw
						};
						dispatch(getLogin(user));
					}
				}
			}, 10);
		};
		timer();
	}, []);
	const [weekDay, setWeekDay] = useState(
		dayjs().tz('Asia/Seoul').locale('ko').format('YYYYMMDD')
	);

	const [ready, toggleReady] = useState<boolean>(false);
	const [weekKey, setWeekKey] = useState<number>(0);
	const [isSelect, setIsSelect] = useState(false);
	const onDayPress = useCallback(
		// 이전 날짜 분리 로직
		(day) => {
			if (count >= 30) {
				setModalTitle('30일 이상 신청할 수 없습니다.\n');
				setModalText('');
				setModalVisible(true);
				return;
			}
			let date: string;
			setSelectDay(day.dateString);

			switch (mode) {
				case 'day': {
					if (dayjs(today).isAfter(day.dateString)) {
						setModalTitle('신청일 이전으로 신청할 수\n 없습니다.\n');
						setModalText('');
						setModalVisible(true);
						return;
					} else if (String(dayjs(today)) === day.dateString) {
						date = day.dateString;
						dispatch(addDay(date));
						setIsSelect(true);
					}
					date = day.dateString;
					dispatch(addDay(date));
					select !== 1 && setSelect(1);
					setIsSelect(true);
					break;
				}
				case 'month': {
					if (ready) return;
					if (dayjs(today).isAfter(day.dateString)) {
						setModalTitle('신청일 이전으로 신청할 수\n 없습니다.\n');
						setModalText('');
						setModalVisible(true);
						return;
					} else if (String(dayjs(today)) === day.dateString) {
						date = day.dateString;
						setWeekDay(date);
					}
					if (weekKey === 4) {
						if (
							dayjs(day.dateString)
								.add(28, 'd')
								.isAfter(dayjs(maxDate).add(1, 'd'))
						) {
							setModalTitle(
								'최대 신청일 기준 이후로 \n 신청하실 수 없습니다.\n'
							);
							setModalText('');
							setModalVisible(true);
							return;
						}
					} else {
						if (
							dayjs(day.dateString)
								.add((weekKey - 1) * 7, 'd')
								.isAfter(dayjs(maxDate).add(1, 'd'))
						) {
							setModalTitle(
								'최대 신청일 기준 이후로 \n 신청하실 수 없습니다.\n'
							);
							setModalText('');
							setModalVisible(true);
							return;
						}
					}

					date = day.dateString;
					setWeekDay(date);
					toggleReady(true);
					setIsSelect(true);
					setMode('day');
					dispatch(setMode('day'));

					break;
				}
			}
		},
		[day, count, successList, weekKey]
	);

	const onPressDays = useCallback(
		(key) => {
			toggleReady(false);
			onRemoveAllDays();
			dispatch(setMode('month'));
			setWeekKey(key);
		},
		[outStayFrDtL, successList]
	);
	const onPressDay = useCallback(() => {
		dispatch(setMode('day'));
		onRemoveAllDays();
	}, [successList, outStayFrDtL, count]);
	useEffect(() => {
		if (ready) {
			dispatch(addDayList({ weekKey, weekDay }));
		}
	}, [weekDay, weekKey, ready]);
	useEffect(() => {
		if (outStayFrDtLCal)
			dispatch(
				makeSuccessList({ outStayFrDtLCal, outStayToDtCal, outStayStGbnCal })
			);
		else dispatch(makeSuccessList({ outStayFrDtL, outStayToDt, outStayStGbn }));
	}, [outStayFrDtLCal, outStayToDtCal, outStayFrDtL, outStayToDt, cookieTime]);
	useEffect(() => {
		if (successList) dispatch(setExistDays({ successList, isConfirmArray }));
	}, [successList, isDark, isConfirmArray, cookieTime]);
	useEffect(() => {
		let data: CalendarAPI;
		if (prepare) {
			data = {
				dateList: sendDays,
				isWeekend: isWeekend,
				sendingToday: sendingToday,
				id: id,
				cookies: cookies
			};
			dispatch(sendDates(data));
			dispatch(togglePrepare());
		}
	}, [prepare, sendDays, isWeekend]);

	const onSendDays = useCallback(() => {
		if (!count) {
			setModalTitle('');
			setModalText('선택된 날짜가 없습니다.\n');
			setModalVisible(true);

			return;
		}
		(async () => {
			await Analytics.logEvent('count_day', { count });
		})();
		dispatch(sendPrepare());
		toggleReady(false);
		setIsSelect(false);
	}, [sendDays, count]);
	const onRemoveAllDays = useCallback(() => {
		if (day) dispatch(initial());

		dispatch(setExistDays({ successList, isConfirmArray }));
		toggleReady(false);
		dispatch(makeCountZero());
		setIsSelect(false);
	}, [outStayFrDtL, successList]);
	// useEffect(() => {
	// 	setModalTitle('[공지사항]');
	// 	setModalText(
	// 		'\n주요 업데이트\n 1. 서랍창 디자인 변경\n 2. 최종 신청일 기준 캘린더 알람 설정\n 3. 영문 → 한글'
	// 	);
	// 	setModalVisible(true);
	// }, []);
	const [refreshing, setRefreshing] = useState(false);
	const onScrollForRefresh = useCallback(() => {
		setRefreshing(true);
		dispatch(initialLogin());
		dispatch(logoutInitial());
		const user = {
			userId: id,
			userPw: pw
		};
		dispatch(getLogin(user));
		setLoading('loading');
		setTimeout(() => setLoading('normal'), 3000);
		setTimeout(() => setRefreshing(false), 3000);
	}, [id, pw]);
	return (
		<SafeAreaView
			style={{
				backgroundColor: isDark ? constColors.mainDarkColor : '#EDF3F7',
				margin: 0,
				padding: 0
			}}
		>
			<View
				style={[
					styles.view,
					,
					{
						backgroundColor: isDark ? constColors.mainDarkColor : '#EDF3F7',
						alignContent: 'center',
						margin: 0,
						padding: 0
					}
				]}
			>
				<ScrollView
					refreshControl={
						<RefreshControl
							tintColor={isDark ? Colors.white : constColors.mainDarkColor}
							refreshing={refreshing}
							onRefresh={onScrollForRefresh}
						/>
					}
				>
					<NavigationHeader
						title="외박 신청"
						Left={() => (
							<TouchHeaderIconView
								underlayColor={isDark ? constColors.mainDarkColor : '#EDF3F7'}
								onPress={open}
							>
								<Icon name="menu" size={33} style={{ marginLeft: 10 }} />
							</TouchHeaderIconView>
						)}
						Right={() => (
							<TouchHeaderIconView
								underlayColor={isDark ? constColors.mainDarkColor : '#EDF3F7'}
								onPress={logout}
							>
								<Icon name="logout" size={30} />
							</TouchHeaderIconView>
						)}
						secondRight={() => (
							<TouchHeaderIconView
								underlayColor={isDark ? constColors.mainDarkColor : '#EDF3F7'}
								onPress={() => setSetting(true)}
							>
								<MaterialIcon name="settings" size={30} />
							</TouchHeaderIconView>
						)}
					/>
					{/*달력*/}
					{isDark && (
						<Calendar
							markingType={'period'}
							style={styles.calendarStyle}
							maxDate={maxDate}
							markedDates={day}
							onDayPress={onDayPress}
							theme={theme}
							// displayLoadingIndicator={true}
						/>
					)}

					{!isDark && (
						<Calendar
							markingType={'period'}
							style={styles.calendarStyle}
							maxDate={maxDate}
							markedDates={day}
							onDayPress={onDayPress}
							theme={theme}
							// displayLoadingIndicator={true}
						/>
					)}
					<TouchableView
						onPress={onRemoveAllDays}
						style={[
							styles.touchableView,
							{
								backgroundColor: isDark
									? isSelect
										? constColors.deleteDarkColor
										: constColors.deleteDarkColor
									: isSelect
									? '#959BAB'
									: '#E4E6EB'
							}
						]}
					>
						<Text
							style={[
								styles.text,
								{
									fontWeight: '400',
									color: isDark ? Colors.white : Colors.black
								}
							]}
						>
							모두삭제
						</Text>
					</TouchableView>
					<TouchableView
						onPress={onSendDays}
						style={[
							styles.touchableView,
							{
								backgroundColor: isDark
									? constColors.submitDarkColor
									: Colors.blue200
								// borderWidth: isSelect ? 0.5 : 0,
							}
						]}
					>
						<Text
							style={[
								styles.text,
								{
									fontWeight: '400',
									color: isDark ? Colors.black : Colors.black
								}
							]}
						>
							신청하기
						</Text>
					</TouchableView>
					<ModalView text={modalText} title={modalTitle} />
					<Buttons
						onPressDay={onPressDay}
						onPressDays={onPressDays}
						isDark={isDark}
						loadingLogin={loadingLogin}
						select={select}
						setSelect={setSelect}
					/>
				</ScrollView>
				<ModalSetting
					modalVisible={settingModalVisible}
					setModalVisible={setSetting}
				/>
				<ModalCalendar />
				<ModalUpdate />
			</View>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	view: { flex: 1 },
	text: { marginRight: 10, fontSize: 15, color: Colors.white },
	calendar: { height: 50 },

	smallTouchableView: {
		flexDirection: 'row',
		height: 60,
		borderRadius: borderRadius,
		width: '70%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginTop: '29%'
	},
	touchableView: {
		flexDirection: 'column',
		height: 60,
		borderRadius: borderRadius,
		width: '90%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginLeft: '-1%',
		marginTop: '7%'
	},
	calendarStyle: {
		borderRadius: borderRadius,
		height: 370,
		width: '98%',
		alignContent: 'center',
		alignSelf: 'center'
	}
});
