import React, { useState } from 'react';
import {
	Platform,
	StyleSheet,
	Keyboard,
	Alert,
	ActivityIndicator,
} from 'react-native';
import {
	SafeAreaView,
	View,
	Text,
	UnderlineText,
	TextInput,
	TouchableView,
	TopBar,
	MaterialCommunityIcon as Icon,
} from '../theme';
import { useAutoFocus, AutoFocusProvider } from '../contexts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useCallback } from 'react';
import { getLogin, initialLogin } from '../store/login';
import { useEffect } from 'react';

export default function MainNavigator() {
	const focus = useAutoFocus();
	const [_id, setId] = useState<string>('');
	const [_pw, setPW] = useState<string>('');
	const { token, loginError, loadingLogin } = useSelector(
		({ login, loading }: RootState) => ({
			token: login.token,
			loginError: login.loginError,
			loadingLogin: loading['login/GET_LOGIN'],
		})
	);
	const dispatch = useDispatch();
	const onSubmit = useCallback(() => {
		dispatch(getLogin({ _id, _pw }));
		setId((notUsed) => '');
		setPW((notUsed) => '');
	}, []);
	useEffect(() => {
		token && Alert.alert('로그인 성공');
		loginError && Alert.alert('로그인 실패!!!');
		dispatch(initialLogin());
	}, [token, loginError]);
	return (
		<View style={[styles.view]}>
			<TopBar>
				<UnderlineText onPress={Keyboard.dismiss} style={[styles.text]}>
					dismiss keyboard
				</UnderlineText>
			</TopBar>
			<AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
				<View style={[styles.textView]}>
					<Text style={[styles.text]}>ID</Text>
					<View border style={[styles.textInputView]}>
						<TextInput
							onFocus={focus}
							style={[styles.textInput]}
							value={_id}
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
							value={_pw}
							onChangeText={(pw) => setPW((text) => pw)}
							placeholder="enter your PW"
						/>
					</View>
				</View>
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
		width: '90%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
