import React, { useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackNavigationOptions } from '@react-navigation/stack';
import { useNavigationHorizontalInterpolator } from '../hooks';
import Home from './Home';
import HomeLeft from './HomeLeft';
import HomeRight from './HomeRight';
import Week from './Point';

const Stack = createStackNavigator();

export default function MainNavigator() {
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
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{/* <Stack.Screen name="Home" component={Home} /> */}
			<Stack.Screen name="Home" component={Home} options={leftOptions} />
			<Stack.Screen name="Point" component={Week} options={rightOptions} />
		</Stack.Navigator>
	);
}
