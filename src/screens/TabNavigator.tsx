import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/core';
import type { ParamListBase, RouteProp } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { useNavigationHorizontalInterpolator } from '../hooks';
import { RootState } from '../store';
import Home from './Home';
import Point from './Point';
import Weather from './Weather';
type TabBarIconProps = { focused: boolean; color: string; size: number };

const icons: Record<string, string[]> = {
  Point: ['trophy-variant', 'trophy-variant-outline'],
  Calendar: ['calendar-month', 'calendar-blank'],
  Weather: ['weather-night-partly-cloudy', 'weather-cloudy'],
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
    innerHeight: 300,
  };
};
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const interpolator = useNavigationHorizontalInterpolator();
  const isDark = useTheme().dark;
  const { name } = useSelector(({ login }: RootState) => ({
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
      sceneContainerStyle={{ backgroundColor: 'black', height: 500 }}
      screenOptions={screenOptions}
    >
      <Tab.Screen
        name="Calendar"
        component={Home}
        options={{
          tabBarLabel: '외박 신청',
          tabBarIconStyle: { marginTop: 2 },
          tabBarActiveTintColor: isDark ? 'white' : 'black',
        }}
      />
      <Tab.Screen
        name="Point"
        component={Point}
        options={{
          tabBarLabel: '상/벌점',
          tabBarIconStyle: { marginTop: 2 },
          tabBarActiveTintColor: isDark ? 'white' : 'black',
        }}
      />
      <Tab.Screen
        name="Weather"
        component={Weather}
        options={{
          tabBarLabel: '날씨',
          tabBarIconStyle: { marginTop: 2 },
          tabBarActiveTintColor: isDark ? 'white' : 'black',
        }}
      />
    </Tab.Navigator>
  );
}
