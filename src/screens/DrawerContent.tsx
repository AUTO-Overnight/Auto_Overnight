/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import { StyleSheet, Linking } from 'react-native';
// prettier-ignore
import {View, Text, NavigationHeader,
MaterialCommunityIcon as Icon, Switch} from '../theme';
import type { FC } from 'react';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerActions, useTheme } from '@react-navigation/native';
import { Avatar, TouchableView } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Colors } from 'react-native-paper';
import { initialLogin } from '../store/login';
import { getLogin } from '../store/login';
import { logoutInitial } from '../store/calendar';
import { blue200 } from 'react-native-paper/lib/typescript/styles/colors';
import { useModal } from '../components';
import Icons from 'react-native-vector-icons/AntDesign';
const backWhiteColor = '#FFFF';
const DrawerContent: FC<DrawerContentComponentProps> = (props) => {
	const { name, id, pw, rememberID } = useSelector(({ login }: RootState) => ({
		name: login.name,
		rememberID: login.rememberID,
		id: login.id,
		pw: login.pw,
	}));
	const { navigation } = props;
	const close = useCallback(
		() => navigation.dispatch(DrawerActions.closeDrawer()),
		[]
	);
	const isDark = useTheme().dark;
	const dispatch = useDispatch();
	const onClickOpenChat = useCallback(() => {
		Linking.openURL('https://open.kakao.com/o/sA4uughd');
	}, []);
	const onClickForm = useCallback(() => {
		Linking.openURL(
			'https://the-form.io/forms/survey/response/10ea54f7-8e79-4efa-8593-d150ffdce4ec'
		);
	}, []);
	const onPressReload = useCallback(() => {
		dispatch(initialLogin());
		dispatch(logoutInitial());
		const user = {
			userId: id,
			userPw: pw,
		};
		dispatch(getLogin(user));
	}, [id, pw]);
	const [text, setModalText] = useState('');
	const title = '[업데이트 내역]\n 1.0.3';
	const { modalVisible, ModalView, setModalVisible } = useModal({
		text,
		title,
	});
	const onPressUpdate = useCallback(() => {
		setModalText(' 1. Android 메뉴 겹침 오류 수정\n 2. 디자인 수정');
		setModalVisible(true);
	}, []);
	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={[
				styles.view,
				{ backgroundColor: isDark ? Colors.black : backWhiteColor },
			]}
		>
			<NavigationHeader
				Right={() => <Icon name="close" size={32} onPress={close} />}
			/>
			<View style={{ backgroundColor: isDark ? Colors.black : backWhiteColor }}>
				<View
					style={[
						styles.content,
						{ backgroundColor: isDark ? Colors.black : backWhiteColor },
					]}
				>
					<View
						style={[
							styles.row,
							{ backgroundColor: isDark ? Colors.black : backWhiteColor },
						]}
					>
						<Text
							style={[
								styles.switchText,
								{ color: isDark ? Colors.white : Colors.grey800 },
							]}
						>
							White / Dark
						</Text>
						<Switch style={[styles.row, { marginLeft: 10 }]} />
					</View>
				</View>
				<View
					style={[
						styles.content,
						{ backgroundColor: isDark ? Colors.black : backWhiteColor },
					]}
				>
					<View
						style={[
							styles.row,
							{ backgroundColor: isDark ? Colors.black : backWhiteColor },
						]}
					>
						{/* <Avatar uri={loginUser.avatar} size={40} /> */}
						<Text
							style={[
								styles.text,
								styles.m,
								{ color: isDark ? Colors.white : Colors.grey800 },
							]}
						>
							안녕하세요 {name}님
						</Text>
					</View>
					<View
						style={[
							styles.row,
							{ backgroundColor: isDark ? Colors.black : backWhiteColor },
						]}
					>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={[
								styles.text,
								styles.m,
								{ color: isDark ? Colors.white : Colors.grey800 },
							]}
						>
							ID : {id}
						</Text>
					</View>
					<View
						style={[
							styles.rowCircle,
							{
								alignSelf: 'center',
								backgroundColor: isDark ? Colors.black : Colors.white,
								width: '90%',
								height: 50,
								borderRadius: 10,
								marginTop: 30,
								marginBottom: 10,
							},
						]}
					>
						<View
							style={[
								styles.circle,
								{ backgroundColor: isDark ? Colors.yellow500 : Colors.red500 },
							]}
						/>
						<Text
							style={[
								styles.touchText,
								{ color: isDark ? Colors.white : Colors.grey800 },
							]}
						>
							승인
						</Text>
						<View
							style={[
								styles.circle,
								{ backgroundColor: isDark ? Colors.red500 : Colors.blue500 },
							]}
						/>
						<Text
							style={[
								styles.touchText,
								{ color: isDark ? Colors.white : Colors.grey800 },
							]}
						>
							미승인
						</Text>
					</View>
					<View
						style={[
							styles.rowButton,
							{ backgroundColor: isDark ? Colors.black : Colors.white },
						]}
					>
						<TouchableView
							onPress={onPressReload}
							style={[
								styles.touchableView,
								// { backgroundColor: isDark ? '#295868' : Colors.blue200 },
							]}
						>
							<Text
								style={[
									styles.buttonText,
									{ color: isDark ? Colors.white : Colors.grey800 },
								]}
							>
								{'      '}
								새로고침
							</Text>
						</TouchableView>
						<Icons
							name="right"
							style={[
								styles.buttonText,
								styles.iconStyle,
								{
									color: isDark ? Colors.white : Colors.grey800,
								},
							]}
						/>
					</View>
					<View
						style={[
							styles.rowButton,
							{ backgroundColor: isDark ? Colors.black : Colors.white },
						]}
					>
						<TouchableView
							onPress={onClickOpenChat}
							style={[
								styles.touchableView,
								// { backgroundColor: isDark ? '#214653' : Colors.blue300 },
							]}
						>
							<Text
								style={[
									styles.buttonText,
									{ color: isDark ? Colors.white : Colors.grey800 },
								]}
							>
								{'      '}
								문의사항
							</Text>
						</TouchableView>
						<Icons
							name="right"
							style={[
								styles.buttonText,
								styles.iconStyle,
								{
									color: isDark ? Colors.white : Colors.grey800,
								},
							]}
						/>
					</View>
					<View
						style={[
							styles.rowButton,
							{ backgroundColor: isDark ? Colors.black : Colors.white },
						]}
					>
						<TouchableView
							onPress={onClickForm}
							style={[
								styles.touchableView,
								// { backgroundColor: isDark ? '#152D35' : Colors.blue400 },
							]}
						>
							<Text
								style={[
									styles.buttonText,
									{ color: isDark ? Colors.white : Colors.grey800 },
								]}
							>
								{'      '}
								설문조사
							</Text>
						</TouchableView>
						<Icons
							name="right"
							style={[
								styles.buttonText,
								styles.iconStyle,
								{
									color: isDark ? Colors.white : Colors.grey800,
								},
							]}
						/>
					</View>
					<View
						style={[
							styles.rowButton,
							{ backgroundColor: isDark ? Colors.black : Colors.white },
						]}
					>
						<TouchableView
							activeOpacity={0.8}
							onPress={onPressUpdate}
							style={[
								styles.touchableView,
								// { backgroundColor: isDark ? '#142328' : Colors.blue500 },
							]}
						>
							<Text
								style={[
									styles.buttonText,
									{ color: isDark ? Colors.white : Colors.grey800 },
								]}
							>
								{'      '}
								업데이트 내역
							</Text>

							<ModalView />
						</TouchableView>
						<Icons
							name="right"
							style={[
								styles.buttonText,
								styles.iconStyle,
								{
									color: isDark ? Colors.white : Colors.grey800,
								},
							]}
						/>
					</View>
				</View>
			</View>
		</DrawerContentScrollView>
	);
};
export default DrawerContent;
const styles = StyleSheet.create({
	view: { flex: 1, padding: 5 },
	rowButton: {
		flexDirection: 'row',
		padding: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	row: {
		flexDirection: 'row',
		padding: 10,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	rowCircle: {
		flexDirection: 'row',
		padding: 15,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	col: { flexDirection: 'column', padding: 10, alignItems: 'center' },
	m: { marginLeft: 17, marginTop: 10 },
	text: { fontSize: 19 },
	touchText: { fontSize: 17 },
	buttonText: {
		fontSize: 17,
		color: Colors.white,
		right: 10,
	},
	iconStyle: {
		paddingRight: 20,
	},
	touchableView: {
		marginTop: 0,
		flexDirection: 'row',
		height: 90,
		borderRadius: 10,
		width: '100%',
		paddingLeft: 30,

		justifyContent: 'flex-start',
		alignItems: 'center',
		// flex: 1,
	},
	content: { padding: 5 },
	line: {
		borderBottomWidth: 3,
	},
	switchText: {
		fontSize: 20,
		marginLeft: 17,
	},
	circle: {
		width: 12 * 2,
		height: 12 * 2,
		borderRadius: 12,
	},
});
