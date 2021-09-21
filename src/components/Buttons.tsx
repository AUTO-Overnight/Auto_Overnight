import React, { useState, useEffect } from 'react';
import { TouchableView } from './TouchableView';
// import { Text, View } from '../theme';
import { Colors } from 'react-native-paper';
import { useSendButtons } from '../hooks';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { green500 } from 'react-native-paper/lib/typescript/styles/colors';
import { useDispatch } from 'react-redux';
import { toggleDark } from '../store/calendar';

const selectBorderWidth = 3;
const whiteModeBorderColor = Colors.green300;
const darkModeBorderColor = Colors.grey700;
export function Buttons({ onPressDay, onPressDays, isDark, loadingLogin }) {
	const [select, setSelect] = useState(1);
	const { buttonList } = useSendButtons();
	const bottomColor = '#c8e473';
	const isRealDark = useTheme().dark;
	const dispatch = useDispatch();
	// const bottomColor = Colors.blue300;
	useEffect(() => {
		setSelect(1);
		dispatch(toggleDark(isRealDark));
	}, [isDark, loadingLogin, isRealDark]);
	return (
		<View
			style={{
				flexDirection: 'row',
				height: '50%',
				width: '90%',
				marginTop: '7%',
				marginLeft: '4.5%',
				// padding: '-20%',
				justifyContent: 'space-between',
				// backgroundColor: 'white',
			}}
		>
			<TouchableView
				onPress={() => {
					onPressDay(), setSelect(1);
				}}
				style={[
					styles.smallTouchableView,
					{
						backgroundColor: isDark ? '#023035' : bottomColor,
						borderColor: isDark ? darkModeBorderColor : whiteModeBorderColor,
						borderWidth: select === 1 ? selectBorderWidth : 0,
					},
				]}
			>
				<Text
					style={[
						styles.buttonText,
						{
							color: isDark ? Colors.white : Colors.grey800,
							fontWeight: '500',
						},
					]}
				>
					{buttonList[0].text}
				</Text>
			</TouchableView>
			<TouchableView
				onPress={() => {
					onPressDays(2), setSelect(2);
				}}
				style={[
					styles.smallTouchableView,
					{
						backgroundColor: isDark ? '#023035' : bottomColor,
						borderColor: isDark ? darkModeBorderColor : whiteModeBorderColor,
						borderWidth: select === 2 ? selectBorderWidth : 0,
					},
				]}
			>
				<Text
					style={[
						styles.buttonText,
						{
							color: isDark ? Colors.white : Colors.grey800,
							fontWeight: '500',
						},
					]}
				>
					{buttonList[1].text}
				</Text>
			</TouchableView>
			<TouchableView
				onPress={() => {
					onPressDays(3), setSelect(3);
				}}
				style={[
					styles.smallTouchableView,
					{
						backgroundColor: isDark ? '#023035' : bottomColor,
						borderColor: isDark ? darkModeBorderColor : whiteModeBorderColor,
						borderWidth: select === 3 ? selectBorderWidth : 0,
					},
				]}
			>
				<Text
					style={[
						styles.buttonText,
						{
							color: isDark ? Colors.white : Colors.grey800,
							fontWeight: '500',
						},
					]}
				>
					{buttonList[2].text}
				</Text>
			</TouchableView>
			<TouchableView
				onPress={() => {
					onPressDays(4), setSelect(4);
				}}
				style={[
					styles.smallTouchableView,
					{
						backgroundColor: isDark ? '#023035' : bottomColor,
						borderColor: isDark ? darkModeBorderColor : whiteModeBorderColor,
						borderWidth: select === 4 ? selectBorderWidth : 0,
					},
				]}
			>
				<Text
					style={[
						styles.buttonText,
						{
							color: isDark ? Colors.white : Colors.grey800,
							fontWeight: '500',
						},
					]}
				>
					{buttonList[3].text}
				</Text>
			</TouchableView>
		</View>
	);
}
const styles = StyleSheet.create({
	smallTouchableView: {
		// marginTop: '30%',
		flexDirection: 'row',
		height: 60,
		borderRadius: 12,
		width: '20%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginTop: '0%',
	},
	buttonText: {
		fontSize: 12,
	},
});
