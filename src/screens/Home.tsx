/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
// prettier-ignore
import {SafeAreaView, View, UnderlineText,TopBar,
NavigationHeader, MaterialCommunityIcon as Icon, TouchableView} from '../theme';
import { ScrollEnabledProvider, useScrollEnabled } from '../contexts';
import { Colors } from 'react-native-paper';
import { LeftRightNavigation } from '../components';
import type { LeftRightNavigationMethods } from '../components';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import type { DateObject } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { addDay, removeAllDays } from '../store/calendar';
import { RootState } from '../store';
dayjs.extend(utc);
dayjs.extend(timezone);
//prettier-ignore
LocaleConfig.locales['ko'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Su','Mo','Tu','We','Th','Fr','Sa'],
  today: 'Aujourd'
};
LocaleConfig.defaultLocale = 'ko';
// const dayjs = require('dayjs');
// const timezone = require('dayjs/plugin/timezone');
// const utc = require('dayjs/plugin/utc');

export default function Home() {
	const { day } = useSelector(({ calendar }: RootState) => ({
		day: calendar.day,
	}));
	// navigation
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const goLeft = useCallback(() => navigation.navigate('HomeLeft'), []);
	const goRight = useCallback(
		() => navigation.navigate('HomeRight', { name: 'Jack', age: 32 }),
		[]
	);
	const open = useCallback(() => {
		navigation.dispatch(DrawerActions.openDrawer());
	}, []);
	const logout = useCallback(() => {
		navigation.navigate('Login');
	}, []);
	// for people
	const [scrollEnabled] = useScrollEnabled();

	const leftRef = useRef<LeftRightNavigationMethods | null>(null);

	const flatListRef = useRef<FlatList | null>(null);
	// calendar
	const [today, setToday] = useState(
		dayjs().tz('Asia/Seoul').locale('ko').format('YYYY-MM-DD')
	);

	console.log('오늘은', today);
	// console.log(today);
	const [selected, setSelected] = useState<string>('');

	const onDayPress = useCallback(
		(day: DateObject) => {
			const date = day.dateString;
			setSelected(date);
			dispatch(addDay(date));
			console.log('touch');
		},
		[day]
	);
	const onRemoveAllDays = useCallback(() => {
		dispatch(removeAllDays());
	}, []);
	return (
		<SafeAreaView>
			<ScrollEnabledProvider>
				<View style={[styles.view]}>
					<NavigationHeader
						title="Home"
						Left={() => <Icon name="menu" size={30} onPress={open} />}
						Right={() => <Icon name="logout" size={30} onPress={logout} />}
					/>
					<TouchableView style={styles.touchableView} notification>
						<UnderlineText
							onPress={onRemoveAllDays}
							style={[
								styles.text,
								{ textAlign: 'right', color: Colors.red100 },
							]}
						>
							remove all
						</UnderlineText>
					</TouchableView>
					<Calendar
						markedDates={day}
						onDayLongPress={() => console.log('byebye')}
						onDayPress={onDayPress}
						theme={calendarTheme}
					/>
					<LeftRightNavigation
						ref={leftRef}
						distance={40}
						flatListRef={flatListRef}
						onLeftToRight={goLeft}
						onRightToLeft={goRight}
					></LeftRightNavigation>
				</View>
			</ScrollEnabledProvider>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	view: { flex: 1 },
	text: { marginRight: 10, fontSize: 20 },
	touchableView: {
		flexDirection: 'row',
		height: 50,
		borderRadius: 10,
		width: '90%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
});

const calendarTheme = {
	backgroundColor: Colors.grey900, // 뒷배경
	calendarBackground: Colors.grey900, // 뒷배경
	textSectionTitleColor: Colors.blue700, // 요일 색상
	textSectionTitleDisabledColor: Colors.red800,
	selectedDayBackgroundColor: Colors.red800,
	selectedDayTextColor: Colors.red800,
	// todayTextColor: Colors.red800,
	dayTextColor: Colors.white,
	textDisabledColor: Colors.black,
	dayTextAtIndex0: Colors.red900,

	monthTextColor: Colors.white,
	indicatorColor: Colors.black,
	// textDayFontWeight: '300',
	// textMonthFontWeight: 'bold',
	// textDayHeaderFontWeight: '300',
	textDayFontSize: 18,
	textMonthFontSize: 18,
	textDayHeaderFontSize: 18,
};
