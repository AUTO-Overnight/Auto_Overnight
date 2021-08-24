import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Login from './Login';
import Counter from './Counter';
import { Provider as PaperProvider } from 'react-native-paper';
import type { RouteProp, ParamListBase } from '@react-navigation/native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

type TabBarIconProps = { focused: boolean; color: string; size: number };

const screenOptions = ({
	route,
}: {
	route: RouteProp<ParamListBase, string>;
}) => {
	return {
		tabBarIcon: ({ focused, color, size }: TabBarIconProps) => {
			const { name } = route;
			switch (name) {
				case 'Login':
					return <AntIcon name="login" size={size} color={color} />;
				case 'Counter':
					return <FontAwesomeIcon name="sign-in" size={size} color={color} />;
			}
		},
	};
};

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
	return (
		<Tab.Navigator screenOptions={screenOptions}>
			<Tab.Screen name="Login" component={Login} />
			<Tab.Screen name="Counter" component={Counter} />
		</Tab.Navigator>
	);
}
