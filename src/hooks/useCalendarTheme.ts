import { useEffect, useState } from 'react';
import { Colors } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { useToggleTheme } from '../contexts';
import { Col } from 'react-native-table-component';
import constColors from '../constants/colors';
export const useCalendarTheme = (): {
	theme: any;
	isDark: boolean;
} => {
	const isDark = useTheme().dark;
	const [theme, setTheme] = useState({
		backgroundColor: isDark ? constColors.mainDarkColor : '#EDF3F7', // 뒷배경
		calendarBackground: isDark ? constColors.mainDarkColor : '#EDF3F7', // 뒷배경
		textSectionTitleColor: isDark ? Colors.white : Colors.grey800, // 요일 색상
		dayTextColor: isDark ? Colors.white : Colors.grey800,
		textDisabledColor: Colors.grey500,
		monthTextColor: isDark ? Colors.white : Colors.grey800,
		textSectionTitleDisabledColor: isDark ? '#a6a6a6' : '#ffff',
		arrowColor: isDark ? constColors.submitDarkColor : constColors.submitColor,
		todayTextColor: isDark ? Colors.yellow400 : Colors.red500
	});

	useEffect(() => {
		setTheme((prevState) => ({
			...prevState,
			backgroundColor: !isDark ? constColors.mainDarkColor : '#EDF3F7', // 뒷배경
			calendarBackground: !isDark ? constColors.mainDarkColor : '#EDF3F7', // 뒷배경
			textSectionTitleColor: !isDark ? Colors.white : Colors.grey800, // 요일 색상
			dayTextColor: !isDark ? Colors.white : Colors.grey800,
			textDisabledColor: Colors.grey500,
			monthTextColor: !isDark ? Colors.white : Colors.grey800,
			arrowColor: !isDark
				? constColors.submitDarkColor
				: constColors.submitColor,
			todayTextColor: !isDark ? Colors.yellow400 : Colors.red500
		}));
		setTheme((prevState) => ({
			...prevState,
			dayTextColor: !isDark ? Colors.white : Colors.grey800
		}));
	}, [isDark]);

	return { theme, isDark };
};
