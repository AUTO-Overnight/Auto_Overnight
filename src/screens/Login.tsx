import React, { useState } from 'react';
import { Platform, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import {
	SafeAreaView,
	View,
	Text,
	TextInput,
	TouchableView,
	MaterialCommunityIcon as Icon,
	Switch,
} from '../theme';

import { Switch as RNSwitch } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useAutoFocus, AutoFocusProvider } from '../contexts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useCallback } from 'react';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {
	getLogin,
	initialLogin,
	setCookieTime,
	setIdPw,
	toggleRemember,
} from '../store/login';
import { useEffect } from 'react';
import { Colors } from 'react-native-paper';
import dayjs from 'dayjs';
dayjs.extend(utc);
dayjs.extend(timezone);
export default function MainNavigator() {
	// text
	const {
		cookies,
		loginError,
		loadingLogin,
		outStayStGbn,
		name,
		id,
		pw,
		rememberID,
	} = useSelector(({ login, loading }: RootState) => ({
		cookies: login.cookies,
		name: login.name,
		loginError: login.loginError,
		outStayStGbn: login.outStayStGbn,
		loadingLogin: loading['login/GET_LOGIN'],
		id: login.id,
		pw: login.pw,
		rememberID: login.rememberID,
	}));
	const focus = useAutoFocus();
	const [userId, setId] = useState<string>(id);
	const [userPw, setPW] = useState<string>(pw);
	const [isEnabled, setIsEnabled] = useState(false);
	useEffect(() => {
		if (rememberID === 'auto') setIsEnabled(true);
		else setIsEnabled(false);
	}, []);
	const toggleSwitch = useCallback(() => {
		setIsEnabled(!isEnabled);
		console.log(isEnabled);
		if (isEnabled) {
			console.log(userId, userPw, '토글 됨');
			dispatch(toggleRemember('no'));
		} else {
			console.log(userId, userPw, '토글 안됨');
			dispatch(toggleRemember('auto'));
		}
	}, [isEnabled]);
	const dispatch = useDispatch();
	const onSubmit = useCallback(() => {
		dispatch(setIdPw({ userId, userPw }));
		dispatch(getLogin({ userId, userPw }));
		// setId((notUsed) => '');
		// setPW((notUsed) => '');
		// dispatch(initialLogin());
	}, [userId, userPw]);

	useEffect(() => {
		if (name) {
			navigation.navigate('TabNavigator');
		} else {
			if (loginError) Alert.alert('로그인 에러');
		}
	}, [loginError, name]);

	const navigation = useNavigation();
	const isDark = useTheme().dark;
	return (
		<SafeAreaView
			style={{ backgroundColor: isDark ? Colors.black : Colors.green200 }}
		>
			<View
				style={[
					styles.view,
					{ backgroundColor: isDark ? Colors.black : Colors.green200 },
				]}
			>
				<AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
					<View
						style={[
							styles.textView,
							{ backgroundColor: isDark ? Colors.black : Colors.green200 },
						]}
					>
						{/* <Text style={[styles.text]}>ID</Text> */}
						<View
							style={[
								styles.textInputView,
								{ backgroundColor: isDark ? '#222831' : '#2e8b57' },
							]}
						>
							<Icon
								name="account"
								size={30}
								style={{
									color: isDark ? Colors.white : Colors.white,
									marginTop: 5,
									paddingRight: 10,
								}}
							/>
							<TextInput
								onFocus={focus}
								style={[
									styles.textInput,
									{ color: isDark ? Colors.white : Colors.white },
								]}
								value={userId}
								onChangeText={(useId) => setId((text) => useId)}
								placeholder="Enter your ID"
								placeholderTextColor={isDark ? Colors.grey400 : Colors.grey200}
							/>
						</View>
					</View>
					<View style={{ marginBottom: 20 }} />
					<View
						style={[
							styles.textView,
							{ backgroundColor: isDark ? Colors.black : Colors.green200 },
						]}
					>
						{/* <Text style={[styles.text]}>PW</Text> */}
						<View
							style={[
								styles.textInputView,
								{ backgroundColor: isDark ? '#222831' : '#2e8b57' },
							]}
						>
							<Icon
								name="lock"
								size={30}
								style={{
									color: isDark ? Colors.white : Colors.white,
									marginTop: 5,
									paddingRight: 10,
								}}
							/>
							<TextInput
								onFocus={focus}
								autoCapitalize="none"
								style={[
									styles.textInput,
									{ color: isDark ? Colors.white : Colors.white },
								]}
								value={userPw}
								onChangeText={(userPw) => setPW((text) => userPw)}
								placeholder="Enter your PW"
								placeholderTextColor={isDark ? Colors.grey400 : Colors.grey300}
							/>
						</View>
					</View>
					<View style={{ marginBottom: 20 }} />
					<View
						style={[
							styles.container,
							{ backgroundColor: isDark ? Colors.black : Colors.green200 },
						]}
					>
						<Switch></Switch>
						<Text style={{ fontSize: 20 }}>White/Dark</Text>
						<RNSwitch
							trackColor={{
								false: '#767577',
								true: isDark ? '#222831' : Colors.green300,
							}}
							thumbColor={isEnabled ? Colors.yellow400 : '#f4f3f4'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitch}
							value={isEnabled}
						/>
						<Text style={{ fontSize: 20 }}>Auto Login</Text>
					</View>
					<View style={{ marginBottom: 40 }} />
					<TouchableView
						notification
						style={[
							styles.touchableView,
							{ backgroundColor: isDark ? '#152D35' : '#2E7D32' },
						]}
						onPress={onSubmit}
					>
						{loadingLogin && (
							<ActivityIndicator size="large" color={Colors.white} />
						)}
						{!loadingLogin && (
							<>
								<Text
									style={[styles.text, { marginRight: 5, color: Colors.white }]}
								>
									Login
								</Text>
								<Icon name="login" size={24} style={{ color: Colors.white }} />
							</>
						)}
					</TouchableView>
				</AutoFocusProvider>
				<View style={[{ marginBottom: Platform.select({ ios: 50 }) }]} />
			</View>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	view: { flex: 1, justifyContent: 'space-between' },
	text: { fontSize: 20 },
	keyboardAwareFocus: {
		flex: 1,
		padding: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textView: {
		width: '100%',
		padding: 0,

		marginBottom: 10,
	},
	textInput: { fontSize: 24, flex: 1 },
	textInputView: {
		flexDirection: 'row',
		// borderWidth: 2,
		borderRadius: 10,
		// borderColor: 'white',
		// paddingBottom: 10,
		padding: 10,
		// height: 55,
		color: Colors.white,
	},
	touchableView: {
		flexDirection: 'row',
		height: 55,
		borderRadius: 10,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		width: '100%',
		flexDirection: 'row',
		marginRight: 10,
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
});
