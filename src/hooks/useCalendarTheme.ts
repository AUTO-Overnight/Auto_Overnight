import type { CalendarTheme } from 'react-native-calendars';
import { useEffect, useState } from 'react';
import { Colors } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { useToggleTheme } from '../contexts';
import { Col } from 'react-native-table-component';
export const useCalendarTheme = (): {
	theme: CalendarTheme;
	isDark: boolean;
} => {
	const isDark = useTheme().dark;
	const [theme, setTheme] = useState<CalendarTheme>({
		backgroundColor: isDark ? '#222831' : Colors.white, // 뒷배경
		calendarBackground: isDark ? '#222831' : Colors.white, // 뒷배경
		textSectionTitleColor: isDark ? Colors.white : Colors.black, // 요일 색상
		// textSectionTitleDisabledColor: Colors.red800,
		// selectedDayBackgroundColor: Colors.red800,
		// selectedDayTextColor: Colors.red800,
		dayTextColor: isDark ? Colors.white : Colors.black,
		textDisabledColor: Colors.grey700,
		monthTextColor: isDark ? Colors.white : Colors.black,
		// indicatorColor: Colors.black,
		textDayFontSize: 18,
		arrowColor: isDark ? Colors.yellow900 : '#FFAAA7',
		textMonthFontSize: 18,
		textDayHeaderFontSize: 18,
		todayTextColor: isDark ? Colors.yellow900 : Colors.red500,
	});

	useEffect(() => {
		if (isDark) {
			setTheme((prevState) => ({
				...prevState,
				backgroundColor: Colors.white,
				calendarBackground: Colors.white, // 뒷배경
				dayTextColor: Colors.black,
				monthTextColor: Colors.black,
				textSectionTitleColor: Colors.black, // 요일 색상
				textDisabledColor: Colors.grey700,
				todayTextColor: Colors.red500,
				textDayFontSize: 18,
				arrowColor: '#345B63',
				textMonthFontSize: 18,
				textDayHeaderFontSize: 18,
			}));
			console.log('다크 모드야');
		} else {
			setTheme((prevState) => ({
				...prevState,
				backgroundColor: '#222831',
				calendarBackground: '#222831', // 뒷배경
				dayTextColor: Colors.white,
				monthTextColor: Colors.white,
				textSectionTitleColor: Colors.white, // 요일 색상
				textDisabledColor: Colors.grey700,
				todayTextColor: Colors.yellowA400,
				textDayFontSize: 18,
				textMonthFontSize: 18,
				textDayHeaderFontSize: 18,
			}));
			console.log('다크 모드 아냐');
		}
	}, [isDark]);

	return { theme, isDark };
};
