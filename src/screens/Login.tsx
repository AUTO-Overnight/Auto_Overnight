import React, { useState } from 'react';
import { Platform, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import {
	SafeAreaView,
	View,
	Text,
	TextInput,
	TouchableView,
	MaterialCommunityIcon as Icon,
} from '../theme';
import { useNavigation } from '@react-navigation/native';
import { useAutoFocus, AutoFocusProvider } from '../contexts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useCallback } from 'react';
import { getLogin, initialLogin, setIdPw } from '../store/login';
import { useEffect } from 'react';
import { Colors } from 'react-native-paper';
export default function MainNavigator() {
	// text
	const focus = useAutoFocus();
	const [id, setId] = useState<string>('2015132012');
	const [pw, setPW] = useState<string>('qkrrkd12!');
	const { cookies, loginError, loadingLogin, dateList, name } = useSelector(
		({ login, loading }: RootState) => ({
			cookies: login.cookies,
			name: login.name,
			loginError: login.loginError,
			dateList: login.dateList,
			loadingLogin: loading['login/GET_LOGIN'],
		})
	);
	const dispatch = useDispatch();
	const onSubmit = useCallback(() => {
		dispatch(setIdPw({ id, pw }));
		dispatch(getLogin({ id, pw }));
		// setId((notUsed) => '');
		// setPW((notUsed) => '');
		// dispatch(initialLogin());
	}, [id, pw]);
	useEffect(() => {
		if (name) {
			navigation.navigate('TabNavigator');
		}
		loginError && Alert.alert('로그인 실패!!!');
	}, [loginError, dateList]);
	const navigation = useNavigation();
	// const goTabNavigator = useCallback(
	// 	() => navigation.navigate('TabNavigator'),
	// 	[]
	// );
	return (
		<SafeAreaView>
			<View style={[styles.view]}>
				<AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
					<View style={[styles.textView]}>
						<Text style={[styles.text]}>ID</Text>
						<View border style={[styles.textInputView]}>
							<TextInput
								onFocus={focus}
								style={[styles.textInput]}
								value={id}
								onChangeText={(id) => setId((text) => id)}
								placeholder="enter your ID"
							/>
						</View>
					</View>
					<View style={[styles.textView]}>
						<Text style={[styles.text]}>PW</Text>
						<View border style={[styles.textInputView]}>
							<TextInput
								onFocus={focus}
								style={[styles.textInput]}
								value={pw}
								onChangeText={(pw) => setPW((text) => pw)}
								placeholder="enter your PW"
							/>
						</View>
					</View>
					<View style={{ marginBottom: 20 }} />
					{loadingLogin && <ActivityIndicator size="large" />}
					<TouchableView
						notification
						style={[styles.touchableView]}
						onPress={onSubmit}
					>
						<Text style={[styles.text, { marginRight: 5 }]}>Login</Text>
						<Icon name="login" size={24} />
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
	textView: { width: '100%', padding: 5, marginBottom: 10 },
	textInput: { fontSize: 24, padding: 10 },
	textInputView: { marginTop: 5, borderRadius: 10 },
	touchableView: {
		flexDirection: 'row',
		height: 50,
		borderRadius: 10,
		width: '97%',
		backgroundColor: Colors.blueA400,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
