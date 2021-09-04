import React, { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeNavigator from './HomeNavigator';
import Week from './Week';
import type { RouteProp, ParamListBase } from '@react-navigation/native';
import Home from './Home';
import { useNavigationHorizontalInterpolator } from '../hooks';
import { StackNavigationOptions } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
type TabBarIconProps = { focused: boolean; color: string; size: number };

const icons: Record<string, string[]> = {
	Home: ['home-circle', 'home-circle-outline'],
	Week: ['brightness-2', 'brightness-3'],
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
			const focusedSize = focused ? size + 6 : size;
			const focusedColor = isDark
				? focused
					? Colors.grey300
					: Colors.grey800
				: focused
				? Colors.black
				: Colors.black;
			const [icon, iconOutline] = icons[name];
			const iconName = focused ? icon : iconOutline;
			return <Icon name={iconName} size={focusedSize} color={focusedColor} />;
		},
		headerShown: false,
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
	return (
		<Tab.Navigator screenOptions={screenOptions}>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarIconStyle: { marginTop: 8 },
					tabBarActiveTintColor: isDark ? 'white' : 'black',
				}}
			/>
			<Tab.Screen
				name="Week"
				component={Week}
				options={{
					tabBarIconStyle: { marginTop: 8 },
					tabBarActiveTintColor: isDark ? 'white' : 'black',
				}}
			/>
		</Tab.Navigator>
	);
}
