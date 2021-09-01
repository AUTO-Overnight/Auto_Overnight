/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { StyleSheet, FlatList, Animated } from 'react-native';
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
import type { DateObject } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import {
	addDay,
	initial,
	removeAllDays,
	sendDates,
	sendPrepare,
	setExistDays,
	togglePrepare,
} from '../store/calendar';
import { RootState } from '../store';
import {
	useAnimatedValue,
	useCalendarTheme,
	useGetBonusPoint,
	useLayout,
	useTransformStyle,
} from '../hooks';
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
  dayNamesShort: ['Su','Mo','Tu','We','Th','Fr','Sa'],
  today: 'today'
};
LocaleConfig.defaultLocale = 'ko';

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesomeIcon);
const iconSize = 50;

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
	const bonus = useGetBonusPoint();
	const { buttonList } = useSendButtons();
	console.log(bonus);
	// const bonus = useMemo(() => {
	// 	useGetBonusPoint();
	// }, []);

	// calendar
	// prettier-ignore
	const [today] = useState(dayjs().tz('Asia/Seoul').locale('ko').format('YYYY-MM-DD'));
	// prettier-ignore
	const [sendingToday] = useState(dayjs().tz('Asia/Seoul').locale('ko').format('YYYYMMDD'));
	const { theme, isDark } = useCalendarTheme();
	const [selected, setSelected] = useState<string>('');
	const onDayPress = useCallback(
		// 이전 날짜 분리 로직
		(day: DateObject) => {
			let date: string;
			if (dayjs(today).isAfter(day.dateString)) {
				return;
			} else if (String(dayjs(today)) === day.dateString) {
				date = day.dateString;
				setSelected(date);
				dispatch(addDay(date));
				console.log('touch');
			}
			date = day.dateString;
			setSelected(date);
			dispatch(addDay(date));
			console.log('touch');
		},
		[day]
	);
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
	}, [prepare]);

	const onSendDays = useCallback(() => {
		dispatch(sendPrepare());
	}, [sendDays]);
	const onRemoveAllDays = useCallback(() => {
		// dispatch(removeAllDays());
		dispatch(initial());
		dispatch(setExistDays(successList));
	}, [outStayFrDtL]);
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
	return (
		<SafeAreaView>
			<ScrollEnabledProvider>
				<View style={[styles.view]}>
					<NavigationHeader
						title="Home"
						Left={() => <Icon name="menu" size={35} onPress={open} />}
						Right={() => <Icon name="logout" size={35} onPress={logout} />}
					/>
					{/*달력*/}
					{isDark && (
						<Calendar
							// style={styles.calendar}
							markedDates={day}
							onDayPress={onDayPress}
							theme={theme}
						/>
					)}
					{!isDark && (
						<Calendar
							// style={styles.calendar}
							markedDates={day}
							onDayPress={onDayPress}
							theme={theme}
						/>
					)}
					{/*버튼*/}
					<View style={{ flex: 0.4 }} />
					<TouchableView
						onPress={onRemoveAllDays}
						style={[
							styles.touchableView,
							{ backgroundColor: isDark ? Colors.red400 : Colors.red200 },
						]}
					>
						<Text style={[styles.text, { fontWeight: '500' }]}>모두삭제</Text>
					</TouchableView>
					<TouchableView
						onPress={onSendDays}
						style={[
							styles.touchableView,
							{ backgroundColor: isDark ? Colors.purple400 : Colors.purple200 },
						]}
					>
						<Text style={[styles.text, { fontWeight: '500' }]}>신청하기</Text>
					</TouchableView>
					<View
						style={{
							flexDirection: 'row',
							width: '24%',
							marginLeft: '2%',
							justifyContent: 'space-between',
						}}
					>
						{buttonList.map((list) => (
							<TouchableView
								key={list.key}
								style={[
									styles.smallTouchableView,
									{
										backgroundColor: isDark ? Colors.blue800 : Colors.blue300,
									},
								]}
							>
								<Text style={[{ color: Colors.white, fontWeight: '500' }]}>
									{list.text}
								</Text>
							</TouchableView>
						))}
					</View>
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
		marginTop: 30,
		flexDirection: 'row',
		height: 60,
		borderRadius: 10,
		width: '70%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	touchableView: {
		marginTop: 30,
		flexDirection: 'row',
		height: 60,
		borderRadius: 10,
		width: '90%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
});
