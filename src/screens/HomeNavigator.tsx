import React, { useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackNavigationOptions } from '@react-navigation/stack';
import { useNavigationHorizontalInterpolator } from '../hooks';
import Home from './Home';
import Point from './Point';

const Stack = createStackNavigator();

export default function MainNavigator() {
	const interpolator = useNavigationHorizontalInterpolator();
	const leftOptions = useMemo<StackNavigationOptions>(
		() => ({
			gestureDirection: 'horizontal-inverted',
			cardStyleInterpolator: interpolator,
			gestureEnabled: false,
		}),
		[]
	);
	const rightOptions = useMemo<StackNavigationOptions>(
		() => ({
			gestureDirection: 'horizontal',
			cardStyleInterpolator: interpolator,
			gestureEnabled: false,
		}),
		[]
	);
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="Home"
		>
			<Stack.Screen name="Home" component={Home} options={leftOptions} />
			<Stack.Screen name="Point" component={Point} options={rightOptions} />
		</Stack.Navigator>
	);
}
