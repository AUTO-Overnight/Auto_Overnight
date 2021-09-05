import React from 'react';
import { TouchableView } from './TouchableView';
// import { Text, View } from '../theme';
import { Colors } from 'react-native-paper';
import { useSendButtons } from '../hooks';
import { StyleSheet, View, Text } from 'react-native';
export function Buttons({ onPressDay, onPressDays, isDark, backWhiteColor }) {
	const { buttonList } = useSendButtons();
	const bottomColor = '#65351d';
	// const bottomColor = Colors.blue300;
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
				onPress={onPressDay}
				style={[
					styles.smallTouchableView,
					{
						backgroundColor: isDark ? '#023035' : bottomColor,
					},
				]}
			>
				<Text style={[{ color: Colors.white, fontWeight: '500' }]}>
					{buttonList[0].text}
				</Text>
			</TouchableView>
			<TouchableView
				onPress={() => onPressDays(2)}
				style={[
					styles.smallTouchableView,
					{
						backgroundColor: isDark ? '#023035' : bottomColor,
					},
				]}
			>
				<Text style={[{ color: Colors.white, fontWeight: '500' }]}>
					{buttonList[1].text}
				</Text>
			</TouchableView>
			<TouchableView
				onPress={() => onPressDays(3)}
				style={[
					styles.smallTouchableView,
					{
						backgroundColor: isDark ? '#023035' : bottomColor,
					},
				]}
			>
				<Text style={[{ color: Colors.white, fontWeight: '500' }]}>
					{buttonList[2].text}
				</Text>
			</TouchableView>
			<TouchableView
				onPress={() => onPressDays(4)}
				style={[
					styles.smallTouchableView,
					{
						backgroundColor: isDark ? '#023035' : bottomColor,
					},
				]}
			>
				<Text style={[{ color: Colors.white, fontWeight: '500' }]}>
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
		borderRadius: 10,
		width: '20%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginTop: '0%',
	},
});
