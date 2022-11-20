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
import { getVersion } from '../store/login';
import { getLogin, initialLogin } from '../store/login';
import type { RootState } from '../store';
import { getAirPollution, getWeather } from '../store/weather';
import constColors from '../constants/colors';
export default function Loading() {
	const { name, id, pw, rememberID, versionOK, loadingVersion } = useSelector(
		({ login, loading }: RootState) => ({
			name: login.name,
			rememberID: login.rememberID,
			id: login.id,
			pw: login.pw,
			versionOK: login.versionOK,
			loadingVersion: loading['GET_VERSION']
		})
	);
	const dispatch = useDispatch();
	useEffect(() => {
		if (rememberID === 'auto') {
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
			dispatch(getAirPollution());
			dispatch(getWeather());
			dispatch(initialLogin());
		}
	}, []);

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
			<Text style={[styles.text]}>{'한국공학대학교\n외박 신청'}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	flex: {
		flex: 1,
		backgroundColor: constColors.mainDarkColor,
		alignContent: 'center',
		justifyContent: 'center'
	},
	text: { textAlign: 'center', fontSize: 20, color: Colors.white }
});
