import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './Login';
import TabNavigator from './TabNavigator';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

export default function MainNavigator() {
	return (
		<Drawer.Navigator
			screenOptions={{ headerShown: false }}
			drawerContent={(props) => <DrawerContent {...props} />}
		>
			<Drawer.Screen name="Login" component={Login} />
			<Drawer.Screen
				name="TabNavigator"
				component={TabNavigator}
				options={{ title: '외박신청' }}
			/>
		</Drawer.Navigator>
	);
}
