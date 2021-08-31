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
	useLayout,
	useTransformStyle,
} from '../hooks';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { interpolate } from '../utils';
import { useToggle } from '../hooks/useToggle';
import { Easing } from 'react-native-reanimated';
import { Colors } from 'react-native-paper';
import { logoutHome } from '../store/login';
import { CalendarAPI } from '../interface';
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
		dateList,
		sendDays,
		cookies,
		isWeekend,
		id,
		prepare,
		outStayFrDtL,
	} = useSelector(({ calendar, login }: RootState) => ({
		day: calendar.day,
		dateList: login.dateList,
		sendDays: calendar.sendDays,
		cookies: login.cookies,
		isWeekend: calendar.isWeekend,
		id: login.id,
		prepare: calendar.prepare,
		outStayFrDtL: calendar.outStayFrDtL,
	}));
	// navigation
	useEffect(() => {
		dispatch(setExistDays(dateList));
		outStayFrDtL && dispatch(setExistDays(outStayFrDtL));
	}, [dateList, outStayFrDtL]);
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

	// calendar
	const [today] = useState(
		dayjs().tz('Asia/Seoul').locale('ko').format('YYYY-MM-DD')
	);
	const [sendingToday] = useState(
		dayjs().tz('Asia/Seoul').locale('ko').format('YYYYMMDD')
	);
	const { theme, isDark } = useCalendarTheme();

	const [selected, setSelected] = useState<string>('');

	const onDayPress = useCallback(
		(day: DateObject) => {
			if (dayjs(today).isAfter(day.dateString)) {
				return;
			} else if (String(dayjs(today)) === day.dateString) {
				const date = day.dateString;
				setSelected(date);
				dispatch(addDay(date));
				console.log('touch');
			}
			const date = day.dateString;
			setSelected(date);
			dispatch(addDay(date));
			console.log('touch');
		},
		[day]
	);
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
			dispatch(removeAllDays());
			dispatch(togglePrepare());
		}
	}, [prepare]);
	useEffect(() => {
		dispatch(setExistDays(outStayFrDtL));
	}, [outStayFrDtL]);
	const onSendDays = useCallback(() => {
		dispatch(sendPrepare());
	}, [sendDays]);
	const onRemoveAllDays = useCallback(() => {
		// dispatch(removeAllDays());
		dispatch(initial());

		outStayFrDtL && dispatch(setExistDays(outStayFrDtL));
		dispatch(setExistDays(dateList));
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
