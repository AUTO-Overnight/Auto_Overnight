import React, { useCallback, useEffect } from 'react';
import {
	StyleSheet,
	ImageBackground,
	Image,
	Alert,
	BackHandler,
	Linking,
} from 'react-native';
import { View, Text } from '../theme';
import { render } from 'react-dom';
import { Colors } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getVersion, initialLogin } from '../store/login';
import { getLogin } from '../store/login';
import type { RootState } from '../store';
import { getAirPollution, getWeather } from '../store/weather';
export default function Loading() {
	const { name, id, pw, rememberID, versionOK, loadingVersion } = useSelector(
		({ login, loading }: RootState) => ({
			name: login.name,
			rememberID: login.rememberID,
			id: login.id,
			pw: login.pw,
			versionOK: login.versionOK,
			loadingVersion: loading['GET_VERSION'],
		})
	);
	const dispatch = useDispatch();
	useEffect(() => {
		if (rememberID === 'auto') {
			dispatch(initialLogin());
			const user = {
				userId: id,
				userPw: pw,
			};
			dispatch(getVersion());
			dispatch(getLogin(user));
			dispatch(getAirPollution());
			dispatch(getWeather());
		} else {
			dispatch(initialLogin());
		}
	}, []);
	useEffect(() => {
		if (!loadingVersion) {
			if (versionOK === false) {
				Alert.alert('업데이트', '앱을 최신 버전으로 업데이트 해주세요', [
					{
						text: 'Cancel',
						onPress: () => BackHandler.exitApp(),
						style: 'cancel',
					},
					{
						text: 'OK',
						onPress: () =>
							Linking.openURL(
								'https://play.google.com/store/apps/details?id=com.ww8007.AutoOvernight'
							),
					},
				]);
			}
		}
	}, [loadingVersion]);

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
		alignContent: 'center',
		justifyContent: 'center',
	},
	text: { textAlign: 'center', fontSize: 25, color: Colors.white },
});
