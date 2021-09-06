import React from 'react';
import { StyleSheet, ImageBackground, Image } from 'react-native';
import { View, Text } from '../theme';
import { render } from 'react-dom';
import { Colors } from 'react-native-paper';

export default function Loading() {
	return (
		<View style={[styles.flex]}>
			<Image
				style={{
					width: '100%',
					resizeMode: 'center',
					height: 400,
				}}
				source={require('../assets/images/small.png')}
			></Image>
			<Text style={[styles.text]}>Auto OverNight</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	flex: {
		flex: 1,
		backgroundColor: Colors.black,
		// flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'center',
	},
	text: { textAlign: 'center', fontSize: 25, color: Colors.white },
});
