import React from 'react';
import { useTheme } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import constColors from '../constants/colors';
export function useIsDarkMode(): {
	isDark: boolean;
	backgroundColor: string;
	textColor: string;
} {
	const isDark = useTheme().dark;
	const backgroundColor = isDark ? constColors.mainDarkColor : Colors.white;
	const textColor = isDark ? Colors.white : Colors.grey800;

	return { isDark, backgroundColor, textColor };
}
