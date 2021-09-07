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
		textSectionTitleColor: isDark ? Colors.white : Colors.grey800, // 요일 색상
		dayTextColor: isDark ? Colors.white : Colors.grey800,
		textDisabledColor: isDark ? Colors.grey500 : '#a6a6a6',
		monthTextColor: isDark ? Colors.white : Colors.grey800,
		textDayFontSize: 18,
		// textSectionTitleDisabledColor: '#a6a6a6',
		arrowColor: isDark ? Colors.yellow400 : '#4A4BFC',
		textMonthFontSize: 18,
		textDayHeaderFontSize: 18,
		todayTextColor: isDark ? Colors.yellow400 : '#182EEC',
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
				textDisabledColor: Colors.grey500,
				todayTextColor: '#182EEC',
				arrowColor: '#4A4BFC',
				textDayFontSize: 18,
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
				textDisabledColor: Colors.grey500,
				todayTextColor: Colors.yellow400,
				arrowColor: Colors.yellow400,
				textDayFontSize: 18,
				textMonthFontSize: 18,
				textDayHeaderFontSize: 18,
			}));
			console.log('다크 모드 아냐');
		}
	}, [isDark]);

	return { theme, isDark };
};
