/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
// prettier-ignore
import {SafeAreaView, View, NavigationHeader, MaterialCommunityIcon as Icon, TouchableView, Text} from '../theme';
import { ScrollEnabledProvider, useScrollEnabled } from '../contexts';
import { LeftRightNavigation } from '../components';
import type { LeftRightNavigationMethods } from '../components';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import type { DateObject, HeaderComponentProps } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import type { CalendarThemeIdStyle } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';

import {
	addDay,
	addDayList,
	initial,
	removeAllDays,
	sendDates,
	sendPrepare,
	setExistDays,
	setMode,
	toggleDark,
	togglePrepare,
} from '../store/calendar';
import { RootState } from '../store';
import {
	useAnimatedValue,
	useCalendarTheme,
	useLayout,
	useTransformStyle,
} from '../hooks';
import { useModal } from '../components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { interpolate } from '../utils';
// import { useToggle } from '../hooks/useToggle';
// import { Easing } from 'react-native-reanimated';
import { Colors } from 'react-native-paper';
import { logoutHome, makeSuccessList } from '../store/login';
import { CalendarAPI } from '../interface';
import { useMemo } from 'react';
import useSendButtons from '../hooks/useSendButtons';
dayjs.extend(utc);
dayjs.extend(timezone);
//prettier-ignore
LocaleConfig.locales['ko'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
//   dayNamesShort: ['Su','Mo','Tu','We','Th','Fr','Sa'],
//   dayNamesShort: ['S','M','T','W','T','F','S'],
  dayNamesShort: ['일','월','화','수','목','금','토'],
  today: 'today'
};
LocaleConfig.defaultLocale = 'ko';

// const AnimatedIcon = Animated.createAnimatedComponent(FontAwesomeIcon);
// const iconSize = 50;

export default function Home() {
	const {
		day,
		sendDays,
		cookies,
		isWeekend,
		id,
		prepare,
		outStayFrDtL,
		outStayToDt,
		outStayToDtCal,
		outStayFrDtLCal,
		successList,
		mode,
	} = useSelector(({ calendar, login }: RootState) => ({
		day: calendar.day,
		sendDays: calendar.sendDays,
		cookies: login.cookies,
		isWeekend: calendar.isWeekend,
		id: login.id,
		prepare: calendar.prepare,
		outStayToDt: login.outStayToDt,
		outStayFrDtL: login.outStayFrDtL,
		outStayToDtCal: calendar.outStayToDtCal,
		outStayFrDtLCal: calendar.outStayFrDtLCal,
		successList: login.successList,
		mode: calendar.mode,
	}));
	// navigation
	// useEffect(() => {}, [outStayFrDtL]);
	const navigation = useNavigation();
	const dispatch = useDispatch();
	// const goLeft = useCallback(() => navigation.navigate('HomeLeft'), []);
	const goRight = useCallback(() => navigation.navigate('Week'), []);
	const open = useCallback(() => {
		navigation.dispatch(DrawerActions.openDrawer());
	}, []);
	const logout = useCallback(() => {
		dispatch(logoutHome());

		navigation.navigate('Login');
	}, []);

	const [scrollEnabled] = useScrollEnabled();
	const leftRef = useRef<LeftRightNavigationMethods | null>(null);
	const flatListRef = useRef<FlatList | null>(null);

	const { buttonList } = useSendButtons();

	// const bonus = useMemo(() => {
	// 	useGetBonusPoint();
	// }, []);

	// calendar
	// prettier-ignore
	const [today] = useState(dayjs().tz('Asia/Seoul').locale('ko').format('YYYY-MM-DD'));
	// prettier-ignore
	const [sendingToday] = useState(dayjs().tz('Asia/Seoul').locale('ko').format('YYYYMMDD'));
	const [maxDate] = useState(
		dayjs().tz('Asia/Seoul').locale('ko').add(45, 'd').format('YYYY-MM-DD')
	);
	const { theme, isDark } = useCalendarTheme();
	const backWhiteColor = isDark ? 'black' : '#F6F6F6';
	useEffect(() => {
		dispatch(toggleDark(isDark));
	}, [isDark]);
	const [selected, setSelected] = useState<string>('');
	const [weekDay, setWeekDay] = useState(
		dayjs().tz('Asia/Seoul').locale('ko').format('YYYYMMDD')
	);

	const [ready, toggleReady] = useState<boolean>(false);
	const [weekKey, setWeekKey] = useState<number>(0);

	const onDayPress = useCallback(
		// 이전 날짜 분리 로직
		(day: DateObject) => {
			let date: string;
			switch (mode) {
				case 'day': {
					if (dayjs(today).isAfter(day.dateString)) {
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
						return;
					} else if (String(dayjs(today)) === day.dateString) {
						date = day.dateString;
						setWeekDay(date);
					}
					date = day.dateString;
					setWeekDay(date);
					toggleReady(true);
					dispatch(setMode('none'));
					break;
				}
			}
		},
		[day]
	);

	const onPressDays = useCallback(
		(key) => {
			toggleReady(false);
			onRemoveAllDays();
			setModalVisible(!modalVisible);
			dispatch(setMode('month'));
			setWeekKey(key);
		},
		[outStayFrDtL, successList]
	);
	const onPressDay = useCallback(() => {
		dispatch(setMode('day'));
		onRemoveAllDays();
	}, []);
	useEffect(() => {
		ready && dispatch(addDayList({ weekKey, weekDay }));
	}, [weekDay, weekKey, ready]);
	useEffect(() => {
		if (outStayFrDtLCal)
			dispatch(makeSuccessList({ outStayFrDtLCal, outStayToDtCal }));
		else dispatch(makeSuccessList);
	}, [outStayFrDtLCal, outStayToDtCal]);
	useEffect(() => {
		dispatch(setExistDays(successList));
	}, [successList]);
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
			console.log(data);
			dispatch(sendDates(data));
			dispatch(togglePrepare());
		}
	}, [prepare, sendDays, isWeekend]);

	const onSendDays = useCallback(() => {
		dispatch(sendPrepare());
		if (mode === 'month' && !sendDays.length) {
			Alert.alert('선택된 날짜가 없습니다');
			return;
		}
		toggleReady(false);
	}, [sendDays]);
	const onRemoveAllDays = useCallback(() => {
		dispatch(initial());
		dispatch(setExistDays(successList));
		toggleReady(false);
	}, [outStayFrDtL, successList]);
	// Animation
	// const [started, toggleStarted] = useToggle(false);
	// const animValue = useAnimatedValue(0);

	// const avatarPressed = useCallback(
	// 	() =>
	// 		Animated.timing(animValue, {
	// 			useNativeDriver: false,
	// 			toValue: started ? 0 : 1,
	// 			easing: Easing.bounce,
	// 		}).start(toggleStarted),
	// 	[started]
	// );

	// const [layout, setLayout] = useLayout();
	// const iconAnimStyle = useTransformStyle(
	// 	{
	// 		translateX: interpolate(animValue, [0, layout.width - iconSize]),
	// 		rotate: interpolate(animValue, ['0deg', '720deg']),
	// 	},
	// 	[layout.width]
	// );
	// const [modalVisible, setModalVisible] = useState(true);
	const { modalVisible, setModalVisible, ModalView } = useModal();
	return (
		<SafeAreaView>
			<ScrollEnabledProvider>
				<View style={[styles.view, , { backgroundColor: backWhiteColor }]}>
					<NavigationHeader
						title="Home"
						Left={() => <Icon name="menu" size={35} onPress={open} />}
						Right={() => <Icon name="logout" size={35} onPress={logout} />}
					/>
					{/*달력*/}
					{isDark && (
						<Calendar
							maxDate={maxDate}
							markedDates={day}
							onDayPress={onDayPress}
							style={{ height: 365 }}
							theme={theme}
							displayLoadingIndicator={true}
							// hideExtraDays={true}
						/>
					)}

					{!isDark && (
						<Calendar
							maxDate={maxDate}
							markedDates={day}
							onDayPress={onDayPress}
							style={{ height: 365 }}
							theme={theme}
							displayLoadingIndicator={true}
							// hideExtraDays={true}
						/>
					)}
					{/*버튼*/}
					{/* <View style={{ height: '100%', flex: 1 }}> */}
					<TouchableView
						onPress={onRemoveAllDays}
						style={[
							styles.touchableView,
							{
								backgroundColor: isDark ? '#345B63' : '#98ddca',
							},
						]}
					>
						<Text
							style={[
								styles.text,
								{ fontWeight: '500', color: isDark ? 'white' : 'white' },
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
								backgroundColor: isDark ? '#152D35' : '#FFAAA7',
							},
						]}
					>
						<Text style={[styles.text, { fontWeight: '500' }]}>신청하기</Text>
					</TouchableView>
					<View
						style={{
							flexDirection: 'row',
							width: '24.3%',
							marginLeft: '0.5%',
							justifyContent: 'space-between',
							backgroundColor: backWhiteColor,
						}}
					>
						{buttonList.map((list) => (
							<TouchableView
								key={list.key}
								onPress={() =>
									list.key === 1 ? onPressDay() : onPressDays(list.key)
								}
								style={[
									styles.smallTouchableView,
									{
										backgroundColor: isDark ? '#023035' : '#EA829C',
									},
								]}
							>
								<Text style={[{ color: Colors.white, fontWeight: '500' }]}>
									{list.text}
								</Text>
								<ModalView />
							</TouchableView>
						))}
						{/* </View> */}
					</View>
					<View style={{ height: 200, backgroundColor: backWhiteColor }} />
					{/* <View onLayout={setLayout} style={[{ flexDirection: 'row' }]}>
						<AnimatedIcon
							style={iconAnimStyle}
							name="soccer-ball-o"
							size={iconSize}
							color={Colors.blue500}
							onPress={avatarPressed}
						/>
					</View> */}
					<LeftRightNavigation
						ref={leftRef}
						distance={40}
						flatListRef={flatListRef}
						// onLeftToRight={goLeft}
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
		// marginTop: '30%',
		flexDirection: 'row',
		height: 60,
		borderRadius: 10,
		width: '70%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginTop: '29%',
		borderColor: Colors.white,
	},
	touchableView: {
		// flex: 0.1,
		flexDirection: 'column',
		height: 60,
		borderRadius: 10,
		width: '90%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginLeft: '-1%',
		marginTop: '7%',

		// marginBottom: '7%',
	},
});
