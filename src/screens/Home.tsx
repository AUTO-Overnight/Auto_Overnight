/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useRef } from 'react';
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
import { addDay, removeAllDays } from '../store/calendar';
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

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesomeIcon);
const iconSize = 50;

export default function Home() {
	const { day } = useSelector(({ calendar }: RootState) => ({
		day: calendar.day,
	}));
	// navigation
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const goLeft = useCallback(() => navigation.navigate('HomeLeft'), []);
	const goRight = useCallback(() => navigation.navigate('Week'), []);
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
	const { theme, isDark } = useCalendarTheme();

	const [selected, setSelected] = useState<string>('');

	const onDayPress = useCallback(
		(day: DateObject) => {
			// if (dayjs(today).isBefore(day.dateString)) {
			// 	setModalVisible((visible) => !visible);
			// }
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
	// Animation
	const [started, toggleStarted] = useToggle(false);
	const animValue = useAnimatedValue(0);

	const avatarPressed = useCallback(
		() =>
			Animated.timing(animValue, {
				useNativeDriver: false,
				toValue: started ? 0 : 1,
				easing: Easing.bounce,
			}).start(toggleStarted),
		[started]
	);

	const [layout, setLayout] = useLayout();
	const iconAnimStyle = useTransformStyle(
		{
			translateX: interpolate(animValue, [0, layout.width - iconSize]),
			rotate: interpolate(animValue, ['0deg', '720deg']),
		},
		[layout.width]
	);
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
						<Calendar markedDates={day} onDayPress={onDayPress} theme={theme} />
					)}
					{!isDark && (
						<Calendar markedDates={day} onDayPress={onDayPress} theme={theme} />
					)}
					{/*버튼*/}
					<View style={{ flex: 1 }} />
					<TouchableView
						onPress={onRemoveAllDays}
						style={[styles.touchableView, { backgroundColor: Colors.red300 }]}
					>
						<Text style={[styles.text, { fontWeight: '500' }]}>모두삭제</Text>
					</TouchableView>
					<TouchableView
						onPress={onRemoveAllDays}
						style={[styles.touchableView, { backgroundColor: Colors.blue300 }]}
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
	text: { marginRight: 10, fontSize: 20, color: 'white' },
	touchableView: {
		marginTop: 30,
		flexDirection: 'row',
		height: 50,
		borderRadius: 30,
		width: '80%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
});
