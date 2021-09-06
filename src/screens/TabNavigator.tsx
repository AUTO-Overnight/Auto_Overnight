import React, { useMemo, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeNavigator from './HomeNavigator';
import Point from './Point';
import type { RouteProp, ParamListBase } from '@react-navigation/native';
import Home from './Home';
import { useNavigationHorizontalInterpolator } from '../hooks';
import { StackNavigationOptions } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigation } from '@react-navigation/core';

type TabBarIconProps = { focused: boolean; color: string; size: number };

const icons: Record<string, string[]> = {
	Point: ['trophy-variant', 'trophy-variant-outline'],
	Calendar: ['brightness-2', 'brightness-3'],
};

const screenOptions = ({
	route,
}: {
	route: RouteProp<ParamListBase, string>;
}) => {
	const isDark = useTheme().dark;
	return {
		tabBarIcon: ({ focused, color, size }: TabBarIconProps) => {
			const { name } = route;
			const focusedSize = focused ? 20 + 3 : 20;
			const focusedColor = isDark
				? focused
					? Colors.yellow600
					: Colors.grey800
				: focused
				? Colors.yellow600
				: Colors.black;
			const [icon, iconOutline] = icons[name];
			const iconName = focused ? icon : iconOutline;
			return <Icon name={iconName} size={focusedSize} color={focusedColor} />;
		},

		headerShown: false,
		color: 'black',
	};
};
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
	const interpolator = useNavigationHorizontalInterpolator();
	const leftOptions = useMemo<StackNavigationOptions>(
		() => ({
			gestureDirection: 'horizontal-inverted',
			cardStyleInterpolator: interpolator,
		}),
		[]
	);
	const rightOptions = useMemo<StackNavigationOptions>(
		() => ({
			gestureDirection: 'horizontal',
			cardStyleInterpolator: interpolator,
		}),
		[]
	);
	const isDark = useTheme().dark;
	const { name } = useSelector(({ calendar, login }: RootState) => ({
		name: login.name,
	}));
	const navigation = useNavigation();
	useEffect(() => {
		if (name) {
			navigation.navigate('Calendar');
		}
	}, [name]);
	return (
		<Tab.Navigator
			sceneContainerStyle={{ backgroundColor: 'black ' }}
			screenOptions={screenOptions}
		>
			<Tab.Screen
				name="Calendar"
				component={Home}
				options={{
					tabBarIconStyle: { marginTop: 2 },
					tabBarActiveTintColor: isDark ? 'white' : 'black',
				}}
			/>
			<Tab.Screen
				name="Point"
				component={Point}
				options={{
					tabBarIconStyle: { marginTop: 2 },
					tabBarActiveTintColor: isDark ? 'white' : 'black',
				}}
			/>
		</Tab.Navigator>
	);
}
