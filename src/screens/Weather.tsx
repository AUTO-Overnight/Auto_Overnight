import React, { useCallback, useRef, useEffect } from 'react';
import { Colors } from 'react-native-paper';
// prettier-ignore
import {SafeAreaView, View, NavigationHeader, MaterialCommunityIcon as Icon, Text, TouchableView} from '../theme';
import {
	DrawerActions,
	useNavigation,
	useTheme,
} from '@react-navigation/native';
import { ScrollView, StyleSheet } from 'react-native';
import { LeftRightNavigation, LeftRightNavigationMethods } from '../components';
import { WeatherInfo } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useGetHeight, useLayout } from '../hooks';
import { setWindowHeight } from '../store/weather';
export default function Weather() {
	const {
		current,
		daily,
		hourly,
		pm10Value,
		pm10Grade,
		pm25Value,
		pm25Grade,
		pm10,
		pm25,
	} = useSelector(({ weather }: RootState) => ({
		current: weather.current,
		daily: weather.daily,
		hourly: weather.hourly,
		pm10Value: weather.pm10Value,
		pm10Grade: weather.pm10Grade,
		pm25Value: weather.pm25Value,
		pm25Grade: weather.pm25Grade,
		pm10: weather.pm10,
		pm25: weather.pm25,
	}));
	const navigation = useNavigation();
	const open = useCallback(() => {
		navigation.dispatch(DrawerActions.openDrawer());
	}, []);
	const logout = useCallback(() => {
		navigation.navigate('Login');
	}, []);
	const goLeft = useCallback(() => navigation.navigate('Calendar'), []);
	const leftRef = useRef<LeftRightNavigationMethods | null>(null);
	const isDark = useTheme().dark;
	const [layout, setLayout] = useLayout();
	const dispatch = useDispatch();
	useEffect(() => {
		const height = useGetHeight();
		dispatch(setWindowHeight(height));
	}, []);
	console.log(layout.height);
	return (
		<SafeAreaView
			style={{ backgroundColor: isDark ? Colors.black : '#EDF3F7' }}
		>
			<View
				style={[
					styles.view,
					{ backgroundColor: isDark ? Colors.black : '#EDF3F7' },
				]}
				onLayout={setLayout}
			>
				<ScrollView>
					<NavigationHeader
						title="Weather"
						Left={() => (
							<Icon
								name="menu"
								size={40}
								onPress={open}
								style={{ marginLeft: '3%' }}
							/>
						)}
						Right={() => (
							<Icon
								name="logout"
								size={35}
								onPress={logout}
								style={{ marginRight: '3%' }}
							/>
						)}
					/>
					<WeatherInfo
						layout={layout}
						isDark={isDark}
						hourly={hourly}
						daily={daily}
						current={current}
						pm10Grade={pm10Grade}
						pm10Value={pm10Value}
						pm25Grade={pm25Grade}
						pm25Value={pm25Value}
						pm10={pm10}
						pm25={pm25}
					/>
					<LeftRightNavigation
						ref={leftRef}
						distance={40}
						onLeftToRight={goLeft}
					/>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	view: { flex: 1 },
});
