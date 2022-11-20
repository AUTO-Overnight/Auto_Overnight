import React, { useState } from 'react';
import {
	Platform,
	StyleSheet,
	Alert,
	ActivityIndicator,
	Linking
} from 'react-native';
import {
	SafeAreaView,
	View,
	Text,
	TextInput,
	TouchableView,
	MaterialCommunityIcon as Icon,
	Switch,
	NavigationHeader
} from '../theme';
import { Switch as RNSwitch } from 'react-native';
import {
	useNavigation,
	useTheme,
	DrawerActions
} from '@react-navigation/native';
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
	setLoginErrorModalVisible,
	toggleRemember
} from '../store/login';
import { useEffect } from 'react';
import { Colors } from 'react-native-paper';
import dayjs from 'dayjs';
import { TouchHeaderIconView } from '../theme/navigation/TouchHeaderIconView';
import constColors from '../constants/colors';
import ModalLoginError from '../components/login/ModalLoginError';
dayjs.extend(utc);
dayjs.extend(timezone);
const marginBottom = 35;
const fontSize = 17;

export default function MainNavigator() {
	const dispatch = useDispatch();
	const {
		loginError,
		loadingLogin,
		name,
		id,
		pw,
		rememberID,
		loginErrorModalVisible
	} = useSelector(({ login, loading }: RootState) => ({
		cookies: login.loginState.cookies,
		name: login.name,
		loginError: login.loginState.loginError,
		outStayStGbn: login.loginState.outStayStGbn,
		loadingLogin: loading['login/GET_LOGIN'],
		id: login.id,
		pw: login.pw,
		rememberID: login.rememberID,
		loginErrorModalVisible: login.loginErrorModalVisible
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
		if (isEnabled) {
			dispatch(toggleRemember('no'));
			dispatch(initialLogin());
		} else {
			dispatch(toggleRemember('auto'));
		}
	}, [isEnabled]);

	const onSubmit = useCallback(() => {
		dispatch(initialLogin());
		dispatch(setIdPw({ userId, userPw }));
		dispatch(getLogin({ userId, userPw }));
	}, [userId, userPw]);
	const navigation = useNavigation();
	useEffect(() => {
		if (name && !loadingLogin) {
			navigation.navigate('TabNavigator');
		} else {
			if (loginError && !loadingLogin) Alert.alert('로그인 에러');
		}
	}, [loginError, name, loadingLogin]);

	const open = useCallback(() => {
		navigation.dispatch(DrawerActions.openDrawer());
	}, []);
	const isDark = useTheme().dark;
	// 로그인 에러 모달
	const onPressLoginErrorText = useCallback(() => {
		dispatch(setLoginErrorModalVisible(!loginErrorModalVisible));
	}, [loginErrorModalVisible]);

	return (
		<SafeAreaView
			style={{
				backgroundColor: isDark ? constColors.mainDarkColor : '#EDF3F7'
			}}
		>
			<NavigationHeader
				title="로그인"
				Left={() => (
					<TouchHeaderIconView
						underlayColor={isDark ? 'black' : '#EDF3F7'}
						onPress={open}
					>
						<Icon name="menu" size={33} style={{ marginLeft: 10 }} />
					</TouchHeaderIconView>
				)}
			/>
			<View
				style={[
					styles.view,
					{ backgroundColor: isDark ? constColors.mainDarkColor : '#EDF3F7' }
				]}
			>
				<AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
					<View
						style={[
							styles.textView,

							{
								backgroundColor: isDark
									? constColors.mainDarkColor
									: Colors.white,
								marginBottom: 10
							}
						]}
					>
						<View
							style={[
								styles.textInputView,
								{ backgroundColor: isDark ? '#222831' : Colors.blue100 }
							]}
						>
							<Icon
								name="account"
								size={30}
								style={{
									color: isDark ? Colors.white : Colors.grey900,
									marginTop: 5,
									paddingRight: 10
								}}
							/>
							<TextInput
								onFocus={focus}
								style={[
									styles.textInput,
									{ color: isDark ? Colors.white : Colors.grey900 }
								]}
								value={userId}
								onChangeText={(useId) => setId((text) => useId)}
								autoCapitalize="none"
								placeholder="201xxxxxxx"
								placeholderTextColor={isDark ? Colors.grey400 : Colors.grey600}
							/>
						</View>
					</View>
					<View style={{ marginBottom: 15 }} />
					<View
						style={[
							styles.textView,
							{
								backgroundColor: isDark ? constColors.mainDarkColor : '#EDF3F7'
							}
						]}
					>
						<View
							style={[
								styles.textInputView,
								{ backgroundColor: isDark ? '#222831' : Colors.blue100 }
							]}
						>
							<Icon
								name="lock"
								size={30}
								style={{
									color: isDark ? Colors.white : Colors.grey900,
									marginTop: 5,
									paddingRight: 10
								}}
							/>
							<TextInput
								onFocus={focus}
								autoCapitalize="none"
								autoCompleteType="password"
								secureTextEntry={true}
								style={[
									styles.textInput,
									{ color: isDark ? Colors.white : Colors.grey900 }
								]}
								value={userPw}
								onChangeText={(userPw) => setPW((text) => userPw)}
								placeholder="PW를 입력해 주세요"
								placeholderTextColor={isDark ? Colors.grey400 : Colors.grey600}
							/>
						</View>
					</View>
					{/* <View style={{ marginBottom: 15 }} /> */}
					{/* 토글 영역 */}
					<View
						style={[
							styles.textFlexEndView,
							{
								backgroundColor: isDark ? constColors.mainDarkColor : '#EDF3F7'
							}
						]}
					>
						<Text style={styles.modalText} onPress={onPressLoginErrorText}>
							로그인 에러가 나타나요 😞
						</Text>
					</View>
					<View style={{ marginBottom: 15 }} />
					<View
						style={[
							styles.container,
							{
								backgroundColor: isDark ? constColors.mainDarkColor : '#EDF3F7'
							}
						]}
					>
						<Switch></Switch>
						<Text
							style={{
								fontSize: 17,
								color: isDark ? Colors.white : Colors.grey800
							}}
						>
							다크 모드
						</Text>
						<RNSwitch
							trackColor={{
								false: '#767577',
								true: isDark ? '#222831' : '#3b5998'
							}}
							thumbColor={isEnabled ? Colors.yellow400 : '#f4f3f4'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitch}
							value={isEnabled}
						/>
						<Text
							style={{
								fontSize: fontSize,
								color: isDark ? Colors.white : Colors.grey800
							}}
						>
							자동 로그인
						</Text>
					</View>
					<View style={{ marginBottom: 50 }} />
					<TouchableView
						notification
						style={[
							styles.touchableView,
							{ backgroundColor: isDark ? '#152D35' : '#3b5998' }
						]}
						onPress={onSubmit}
					>
						{loadingLogin && (
							<ActivityIndicator size="large" color={Colors.white} />
						)}
						{!loadingLogin && (
							<>
								<Text
									style={[
										styles.text,
										{
											marginRight: 5,
											color: isDark ? Colors.white : Colors.white
										}
									]}
								>
									로그인
								</Text>
								<Icon
									name="login"
									size={24}
									style={{ color: isDark ? Colors.white : Colors.white }}
								/>
							</>
						)}
					</TouchableView>
				</AutoFocusProvider>
				<View style={[{ marginBottom: Platform.select({ ios: 50 }) }]} />
				<ModalLoginError />
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
		justifyContent: 'center'
	},
	textView: {
		width: '90%',
		padding: 0,
		marginBottom: marginBottom
	},
	textInput: { fontSize: fontSize, flex: 1 },
	textInputView: {
		flexDirection: 'row',
		borderRadius: 10,
		padding: 10,
		color: Colors.white
	},
	touchableView: {
		flexDirection: 'row',
		height: 55,
		borderRadius: 10,
		width: '90%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		display: 'flex',
		width: '90%',
		flexDirection: 'row',
		marginRight: 10,
		alignItems: 'center',
		justifyContent: 'space-evenly'
	},
	textFlexEndView: {
		display: 'flex',
		width: '90%',
		flexDirection: 'row',
		marginRight: 10,
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	modalText: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		alignContent: 'flex-end',
		alignSelf: 'flex-end'
	}
});
