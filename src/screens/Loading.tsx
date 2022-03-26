import React, { useCallback, useEffect } from 'react';
import {
	StyleSheet,
	ImageBackground,
	Image,
	Alert,
	BackHandler,
	Linking,
	Platform
} from 'react-native';
import { View, Text } from '../theme';
import { render } from 'react-dom';
import { Colors } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getVersion, setLogin } from '../store/login';
import { getLogin, initialLogin } from '../store/login';
import type { RootState } from '../store';
import { getAirPollution, getWeather } from '../store/weather';
export default function Loading() {
	const { id, pw, rememberID } = useSelector(({ login }: RootState) => ({
		rememberID: login.rememberID,
		id: login.id,
		pw: login.pw
	}));
	const dispatch = useDispatch();
	useEffect(() => {
		if (rememberID === 'auto') {
			dispatch(setLogin(false));
			dispatch(initialLogin());
			const user = {
				userId: id,
				userPw: pw
			};
			dispatch(getVersion());
			dispatch(getLogin(user));
			dispatch(getAirPollution());
			dispatch(getWeather());
		} else {
			dispatch(initialLogin());
		}
	}, []);
	// useEffect(() => {
	// 	if (!loadingVersion) {
	// 		if (versionOK === false && Platform.OS === 'android') {
	// 			Alert.alert('업데이트', '앱을 최신 버전으로 업데이트 해주세요', [
	// 				{
	// 					text: 'Cancel',
	// 					onPress: () => BackHandler.exitApp(),
	// 					style: 'cancel'
	// 				},
	// 				{
	// 					text: 'OK',
	// 					onPress: () =>
	// 						Linking.openURL(
	// 							'https://play.google.com/store/apps/details?id=com.ww8007.AutoOvernight'
	// 						)
	// 				}
	// 			]);
	// 		}
	// 	}
	// }, [loadingVersion]);

	return (
		<View style={[styles.flex]}>
			<Image
				style={{
					width: '100%',
					resizeMode: 'center',
					height: 400
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
		alignContent: 'center',
		justifyContent: 'center'
	},
	text: { textAlign: 'center', fontSize: 25, color: Colors.white }
});
