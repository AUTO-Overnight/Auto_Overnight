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
import { BusModal } from '../components';
const backWhiteColor = '#FFFF';
const fontSize = 15;
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
	const onClickCallOne = useCallback(() => {
		Linking.openURL(`tel:03180411030`);
	}, []);
	const onClickCallTwo = useCallback(() => {
		Linking.openURL(`tel:03180411020`);
	}, []);
	const onClickBusPDF = useCallback(() => {
		Linking.openURL('https://ibook.kpu.ac.kr/Viewer/bus01');
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

	const title = '[업데이트 내역]\n 1.0.4';
	const { modalVisible, ModalView, setModalVisible } = useModal({
		text,
		title,
	});
	const [busModalVisible, setBusModalVisible] = useState(false);
	const [mode, setMode] = useState('2');
	const onPressUpdate = useCallback(() => {
		setModalText(
			'1. [날씨/미세먼지 페이지 추가]\n    API call 제한 있으니 안되면 \n    초과한 겁니다... \n2. [셔틀 시간표/최단 시간 계산 추가]\n    최단 시간의 경우 아직 베타 버전\n    이기 때문에 오류가 있을 수 있습니다\n3. [생활관 전화 연결 추가]\n4. [폰트/디자인 변경]'
		);
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
				Left={() => <Switch style={[styles.row, { marginLeft: 23 }]} />}
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
								// marginTop: 30,
								// marginBottom: 10,
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
							onPress={onClickCallOne}
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
								{'      '}1 기숙사 사감실 전화 연결
							</Text>
						</TouchableView>
						<Icons
							name="phone"
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
							onPress={onClickCallTwo}
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
								{'      '}2 기숙사 사감실 전화 연결
							</Text>
						</TouchableView>
						<Icons
							name="phone"
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
							onPress={() => setBusModalVisible(!busModalVisible)}
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
								최단 셔틀 시간 계산
							</Text>

							<ModalView />
						</TouchableView>
						<Icons
							name="aliwangwang"
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
							onPress={onClickBusPDF}
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
								셔틀 시간표 보기
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
					<BusModal
						modalVisible={busModalVisible}
						setModalVisible={setBusModalVisible}
						isDark={isDark}
						// mode={mode}
						// setMode={setMode}
					/>
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
		padding: 15,
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
	m: { marginLeft: 10, marginTop: 10 },
	text: { fontSize: fontSize },
	touchText: { fontSize: fontSize },
	buttonText: {
		fontSize: fontSize,
		color: Colors.white,
		right: 10,
	},
	iconStyle: {
		paddingRight: 20,
	},
	touchableView: {
		marginTop: 0,
		flexDirection: 'row',
		height: 55,
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
		width: 9 * 2,
		height: 9 * 2,
		borderRadius: 9,
	},
});
