/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
// prettier-ignore
import {SafeAreaView, View, NavigationHeader, MaterialCommunityIcon as Icon, TouchableView, Text} from '../theme';
import { ScrollEnabledProvider, useScrollEnabled } from '../contexts';
import { Buttons, LeftRightNavigation } from '../components';
import type { LeftRightNavigationMethods } from '../components';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import type { DateObject } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
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
	toggleDark,
	togglePrepare,
} from '../store/calendar';
import type { RootState } from '../store';
import { useCalendarTheme } from '../hooks';
import { useModal } from '../components';
import { Colors } from 'react-native-paper';
import {
	getLogin,
	initialLogin,
	logoutHome,
	makeSuccessList,
} from '../store/login';
import { CalendarAPI } from '../interface';
dayjs.extend(utc);
dayjs.extend(timezone);
//prettier-ignore
LocaleConfig.locales['ko'] = {
  monthNames: ['1 /', '2 / ', '3 /', '4 /', '5 /', '6 /', '7 /', '8 /', '9 /', '10 /', '11 /', '12 /'],
  monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['일','월','화','수','목','금','토'],
  today: 'today'
};
LocaleConfig.defaultLocale = 'ko';
const borderRadius = 12;
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
		name,
	} = useSelector(({ calendar, login }: RootState) => ({
		day: calendar.day,
		sendDays: calendar.sendDays,
		cookies: login.cookies,
		isWeekend: calendar.isWeekend,
		id: login.id,
		pw: login.pw,
		name: login.name,
		prepare: calendar.prepare,
		outStayToDt: login.outStayToDt,
		outStayFrDtL: login.outStayFrDtL,
		outStayStGbn: login.outStayStGbn,
		outStayToDtCal: calendar.outStayToDtCal,
		outStayFrDtLCal: calendar.outStayFrDtLCal,
		outStayStGbnCal: calendar.outStayStGbnCal,
		successList: login.successList,
		mode: calendar.mode,
		count: calendar.count,
		cookieTime: login.cookieTime,
		data: login.data,
		isConfirmArray: login.isConfirmArray,
		rememberID: login.rememberID,
	}));
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const goRight = useCallback(() => navigation.navigate('Point'), []);
	const [modalText, setModalText] = useState<string>('');
	const { modalVisible, setModalVisible, ModalView } = useModal({
		text: modalText,
	});
	const open = useCallback(() => {
		navigation.dispatch(DrawerActions.openDrawer());
	}, []);
	const logout = useCallback(() => {
		dispatch(logoutHome());
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

	const { theme, isDark } = useCalendarTheme();
	const backWhiteColor = isDark ? 'black' : '#F6F6F6';
	useEffect(() => {
		dispatch(toggleDark(isDark));
		onRemoveAllDays();
		return () => dispatch(logoutInitial());
	}, [isDark]);
	useEffect(() => {
		const timer = () => {
			setTimeout(() => {
				const time = dayjs().tz('Asia/Seoul').locale('ko');
				if (dayjs(time).isAfter(dayjs(cookieTime).add(1, 'hours'))) {
					if (rememberID === 'auto') {
						dispatch(initialLogin());
						const user = {
							userId: id,
							userPw: pw,
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

	const onDayPress = useCallback(
		// 이전 날짜 분리 로직
		(day: DateObject) => {
			if (count >= 30) {
				setModalText('30일 이상 신청할 수 없습니다.');
				setModalVisible(true);
				return;
			}
			let date: string;

			switch (mode) {
				case 'day': {
					if (dayjs(today).isAfter(day.dateString)) {
						setModalText('신청일 이전으로 신청할 수 없습니다.');
						setModalVisible(true);
						return;
					} else if (String(dayjs(today)) === day.dateString) {
						date = day.dateString;
						dispatch(addDay(date));
					}
					date = day.dateString;
					dispatch(addDay(date));
					break;
				}
				case 'month': {
					if (ready) return;
					if (dayjs(today).isAfter(day.dateString)) {
						setModalText('신청일 이전으로 신청할 수 없습니다.');
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
							setModalText('최대 신청일 기준 이후로 \n 신청하실 수 없습니다.');
							setModalVisible(true);
							return;
						}
					} else {
						if (
							dayjs(day.dateString)
								.add((weekKey - 1) * 7, 'd')
								.isAfter(dayjs(maxDate).add(1, 'd'))
						) {
							setModalText('최대 신청일 기준 이후로 \n 신청하실 수 없습니다.');
							setModalVisible(true);
							return;
						}
					}

					date = day.dateString;
					setWeekDay(date);
					toggleReady(true);
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
	}, [successList, outStayFrDtL]);
	useEffect(() => {
		ready && dispatch(addDayList({ weekKey, weekDay }));
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
				cookies: cookies,
			};
			dispatch(sendDates(data));
			dispatch(togglePrepare());
		}
	}, [prepare, sendDays, isWeekend]);

	const onSendDays = useCallback(() => {
		if (!count) {
			setModalText('선택된 날짜가 없습니다.');
			setModalVisible(true);
			return;
		}
		dispatch(sendPrepare());
		toggleReady(false);
	}, [sendDays, count]);
	const onRemoveAllDays = useCallback(() => {
		if (day) dispatch(initial());

		dispatch(setExistDays({ successList, isConfirmArray }));
		toggleReady(false);
		dispatch(makeCountZero());
	}, [outStayFrDtL, successList]);

	return (
		<SafeAreaView
			style={{ backgroundColor: isDark ? Colors.black : '#EDF3F7' }}
		>
			<ScrollEnabledProvider>
				<View
					style={[
						styles.view,
						,
						{
							backgroundColor: isDark ? Colors.black : '#EDF3F7',
							alignContent: 'center',
						},
					]}
				>
					<NavigationHeader
						title="Calendar"
						Left={() => (
							<Icon
								name="menu"
								size={40}
								onPress={open}
								style={{ marginLeft: '3%' }}
							/>
						)}
						Right={() => (
							<Icon
								name="logout"
								size={35}
								onPress={logout}
								style={{ marginRight: '3%' }}
							/>
						)}
					/>
					{/*달력*/}
					{isDark && (
						<Calendar
							style={styles.calendarStyle}
							maxDate={maxDate}
							markedDates={day}
							onDayPress={onDayPress}
							theme={theme}
							displayLoadingIndicator={true}
						/>
					)}

					{!isDark && (
						<Calendar
							style={styles.calendarStyle}
							maxDate={maxDate}
							markedDates={day}
							onDayPress={onDayPress}
							theme={theme}
							displayLoadingIndicator={true}
						/>
					)}
					<TouchableView
						onPress={onRemoveAllDays}
						style={[
							styles.touchableView,
							{
								backgroundColor: isDark ? '#345B63' : '#E4E6EB',
							},
						]}
					>
						<Text
							style={[
								styles.text,
								{
									fontWeight: '400',
									color: isDark ? Colors.white : Colors.grey800,
								},
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
								backgroundColor: isDark ? '#152D35' : Colors.blue200,
							},
						]}
					>
						<Text
							style={[
								styles.text,
								{
									fontWeight: '400',
									color: isDark ? Colors.white : Colors.grey800,
								},
							]}
						>
							신청하기
						</Text>
					</TouchableView>

					<Buttons
						onPressDay={onPressDay}
						onPressDays={onPressDays}
						isDark={isDark}
						backWhiteColor={backWhiteColor}
					/>
					<ModalView text={modalText} />
					<LeftRightNavigation
						ref={leftRef}
						distance={40}
						flatListRef={flatListRef}
						onRightToLeft={goRight}
					/>
				</View>
			</ScrollEnabledProvider>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	view: { flex: 1 },
	text: { marginRight: 10, fontSize: 20, color: Colors.white },
	calendar: { height: 50 },

	smallTouchableView: {
		flexDirection: 'row',
		height: 60,
		borderRadius: borderRadius,
		width: '70%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginTop: '29%',
	},
	touchableView: {
		flexDirection: 'column',
		height: 60,
		borderRadius: borderRadius,
		width: '90%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginLeft: '-1%',
		marginTop: '7%',
	},
	calendarStyle: {
		borderRadius: borderRadius,
		height: 370,
		width: '90%',
		alignContent: 'center',
		alignSelf: 'center',
	},
});
