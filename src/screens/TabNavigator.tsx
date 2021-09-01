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
	return {
		tabBarIcon: ({ focused, color, size }: TabBarIconProps) => {
			const { name } = route;
			const focusedSize = focused ? size + 6 : size;
			const focusedColor = focused ? Colors.red500 : Colors.red300;
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
	return (
		<Tab.Navigator screenOptions={screenOptions}>
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="Week" component={Week} />
		</Tab.Navigator>
	);
}
