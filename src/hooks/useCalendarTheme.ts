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
		backgroundColor: isDark ? '#222831' : '#256f46', // 뒷배경
		calendarBackground: isDark ? '#222831' : '#256f46', // 뒷배경
		textSectionTitleColor: Colors.white, // 요일 색상
		dayTextColor: Colors.white,
		textDisabledColor: isDark ? Colors.grey700 : '#a6a6a6',
		monthTextColor: Colors.white,
		textDayFontSize: 18,
		arrowColor: isDark ? Colors.orange600 : Colors.yellow400,
		textMonthFontSize: 18,
		textDayHeaderFontSize: 18,
		todayTextColor: isDark ? Colors.orange600 : Colors.yellow400,
	});

	useEffect(() => {
		if (isDark) {
			setTheme((prevState) => ({
				...prevState,
				backgroundColor: '#256f46',
				calendarBackground: '#256f46', // 뒷배경
				dayTextColor: Colors.white,
				monthTextColor: Colors.white,
				textSectionTitleColor: Colors.white, // 요일 색상
				textDisabledColor: '#a6a6a6',
				todayTextColor: Colors.yellow400,
				textDayFontSize: 18,
				arrowColor: Colors.yellow400,
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
				todayTextColor: Colors.orange600,
				arrowColor: Colors.orange600,
				textDayFontSize: 18,
				textMonthFontSize: 18,
				textDayHeaderFontSize: 18,
			}));
			console.log('다크 모드 아냐');
		}
	}, [isDark]);

	return { theme, isDark };
};
