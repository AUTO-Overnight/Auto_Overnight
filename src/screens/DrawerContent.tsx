/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import {
	StyleSheet,
	Linking,
	TouchableHighlight,
	Dimensions
} from 'react-native';
// prettier-ignore
import {View, Text, NavigationHeader,
MaterialCommunityIcon as Icon, Switch} from '../theme';
import type { FC } from 'react';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerActions, useTheme } from '@react-navigation/native';
import { Avatar, ModalUpdate, TouchableView } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Colors } from 'react-native-paper';
import { initialLogin } from '../store/login';
import { getLogin } from '../store/login';
import { logoutInitial, setUpdateModalVisible } from '../store/calendar';
import { blue200 } from 'react-native-paper/lib/typescript/styles/colors';
import { useModal } from '../components';
import Icons from 'react-native-vector-icons/AntDesign';
import { BusModal } from '../components';
import Font5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionic from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
const backWhiteColor = '#FFFF';
const fontSize = 15;
const screen = Dimensions.get('screen');
const DrawerContent: FC<DrawerContentComponentProps> = (props) => {
	const { name, id, pw, rememberID } = useSelector(({ login }: RootState) => ({
		name: login.name,
		rememberID: login.rememberID,
		id: login.id,
		pw: login.pw
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
			userPw: pw
		};
		dispatch(getLogin(user));
	}, [id, pw]);
	const [text, setModalText] = useState('');

	const title = '[업데이트 내역]\n 1.0.4';
	const { modalVisible, ModalView, setModalVisible } = useModal({
		text,
		title
	});

	const [busModalVisible, setBusModalVisible] = useState(false);
	const [mode, setMode] = useState('2');
	const onPressUpdate = useCallback(() => {
		dispatch(setUpdateModalVisible(true));
	}, []);
	const [buttons] = useState([
		{
			onPress: onClickCallOne,
			text: '1 기숙사',
			iconName: 'ios-phone-portrait-outline',
			iconColor: Colors.blue500
		},
		{
			onPress: onClickCallTwo,
			text: '2 기숙사',
			iconName: 'ios-phone-portrait-outline',
			iconColor: Colors.blue500
		}
	]);
	const [secondButtons] = useState([
		{
			onPress: onClickForm,
			text: '설문조사',
			iconName: 'ios-checkmark-sharp',
			iconColor: Colors.blue500
		},
		{
			onPress: onClickOpenChat,
			text: '카카오톡',
			iconName: 'chatbubble-sharp',
			iconColor: Colors.blue500
		}
	]);
	const [thirdButtons] = useState([
		{
			onPress: onClickBusPDF,
			text: '셔틀 시간표 보기',
			iconName: 'md-bus-sharp',
			iconColor: Colors.blue500
		},
		{
			onPress: onPressUpdate,
			text: '업데이트 내역',
			iconName: 'cloud-download',
			iconColor: Colors.blue500
		}
	]);
	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={[
				styles.view,
				{ backgroundColor: isDark ? Colors.black : '#fff' }
			]}
		>
			<StatusBar style={isDark ? 'light' : 'dark'} />
			<NavigationHeader
				backgroundColor={isDark ? 'black' : '#fff'}
				// Left={() => <Switch style={[styles.row, { marginLeft: 23 }]} />}
				Right={() => <Icon name="close" size={32} onPress={close} />}
			/>
			<View style={{ backgroundColor: isDark ? Colors.black : backWhiteColor }}>
				<View
					style={[
						styles.content,
						{ backgroundColor: isDark ? Colors.black : backWhiteColor }
					]}
				>
					<Text style={[styles.titleText, { marginTop: 0 }]}>
						기숙사 전화 연결
					</Text>
					<View style={[styles.blankView]} />
					<View style={styles.columnView}>
						{buttons.map((button) => (
							<TouchableHighlight
								activeOpacity={0.5}
								underlayColor={isDark ? Colors.grey800 : Colors.grey200}
								key={button.text}
								style={{ backgroundColor: isDark ? 'black' : '#fff' }}
								onPress={() => button.onPress()}
							>
								<View style={styles.rowView}>
									<Ionic
										name={button.iconName}
										size={21}
										style={styles.iconStyle}
										color={button.iconColor}
									/>
									<Text style={styles.touchText}>{button.text}</Text>
									<View style={styles.iconView}>
										<Font5Icon
											name="angle-right"
											size={19}
											color={isDark ? 'white' : 'black'}
											style={styles.rightIconStyle}
										/>
									</View>
								</View>
							</TouchableHighlight>
						))}
					</View>
					<View
						style={[
							styles.blankGreyView,
							{ backgroundColor: isDark ? Colors.grey800 : Colors.grey300 }
						]}
					/>
					<Text style={styles.titleText}>문의하기</Text>
					<View style={styles.blankView} />
					<View style={styles.columnView}>
						{secondButtons.map((button) => (
							<TouchableHighlight
								activeOpacity={0.5}
								underlayColor={isDark ? Colors.grey800 : Colors.grey200}
								key={button.text}
								style={{ backgroundColor: isDark ? 'black' : '#fff' }}
								onPress={() => button.onPress()}
							>
								<View style={styles.rowView}>
									<Ionic
										name={button.iconName}
										size={21}
										style={styles.iconStyle}
										color={button.iconColor}
									/>
									<Text style={styles.touchText}>{button.text}</Text>
									<View style={styles.iconView}>
										<Font5Icon
											name="angle-right"
											size={19}
											color={isDark ? 'white' : 'black'}
											style={styles.rightIconStyle}
										/>
									</View>
								</View>
							</TouchableHighlight>
						))}
					</View>
					<View
						style={[
							styles.blankGreyView,
							{ backgroundColor: isDark ? Colors.grey800 : Colors.grey300 }
						]}
					/>
					<Text style={styles.titleText}>Etc</Text>
					<View style={styles.blankView} />
					<View style={styles.columnView}>
						{thirdButtons.map((button) => (
							<TouchableHighlight
								activeOpacity={0.5}
								underlayColor={isDark ? Colors.grey800 : Colors.grey200}
								key={button.text}
								style={{ backgroundColor: isDark ? 'black' : '#fff' }}
								onPress={() => button.onPress()}
							>
								<View style={styles.rowView}>
									<Ionic
										name={button.iconName}
										size={21}
										style={styles.iconStyle}
										color={button.iconColor}
									/>
									<Text style={styles.touchText}>{button.text}</Text>
									<View style={styles.iconView}>
										<Font5Icon
											name="angle-right"
											size={19}
											color={isDark ? 'white' : 'black'}
											style={styles.rightIconStyle}
										/>
									</View>
								</View>
							</TouchableHighlight>
						))}
					</View>
					<BusModal
						modalVisible={busModalVisible}
						setModalVisible={setBusModalVisible}
						isDark={isDark}
						// mode={mode}
						// setMode={setMode}
					/>
					<View
						style={[
							styles.blankGreyView,
							{ backgroundColor: isDark ? Colors.grey800 : Colors.grey300 }
						]}
					/>
					<Text style={styles.titleText}>달력 정보</Text>
					<View style={styles.blankView} />
					<View
						style={[
							styles.rowCircle,
							{
								alignSelf: 'center',
								backgroundColor: isDark ? Colors.black : Colors.white,
								width: '90%',
								height: 50,
								borderRadius: 10
							}
						]}
					>
						<View
							style={[
								styles.circle,
								{ backgroundColor: isDark ? Colors.yellow500 : Colors.red500 }
							]}
						/>
						<Text
							style={[
								styles.touchText,
								{ color: isDark ? Colors.white : Colors.grey800 }
							]}
						>
							승인
						</Text>
						<View
							style={[
								styles.circle,
								{ backgroundColor: isDark ? Colors.red500 : Colors.blue500 }
							]}
						/>
						<Text
							style={[
								styles.touchText,
								{ color: isDark ? Colors.white : Colors.grey800 }
							]}
						>
							미승인
						</Text>
					</View>
				</View>
				<ModalUpdate />
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
		alignItems: 'center'
	},
	row: {
		flexDirection: 'row',
		padding: 15,
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	rowCircle: {
		flexDirection: 'row',
		padding: 15,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	col: { flexDirection: 'column', padding: 10, alignItems: 'center' },
	m: { marginLeft: 10, marginTop: 10 },
	text: { fontSize: fontSize, fontFamily: 'NanumSquareR' },
	touchText: { fontSize: fontSize, fontFamily: 'NanumSquareR' },
	buttonText: {
		fontSize: fontSize,
		color: Colors.white,
		right: 10,
		fontFamily: 'NanumSquareR'
	},
	iconStyle: {
		marginLeft: 10,
		height: 25,
		width: 25,
		marginTop: 3,
		marginRight: 5
	},
	touchableView: {
		marginTop: 0,
		flexDirection: 'row',
		height: 55,
		borderRadius: 10,
		width: '100%',
		paddingLeft: 30,

		justifyContent: 'flex-start',
		alignItems: 'center'
		// flex: 1,
	},
	content: { padding: 0 },
	line: {
		borderBottomWidth: 3
	},
	switchText: {
		fontSize: 20,
		marginLeft: 17
	},
	circle: {
		width: 9 * 2,
		height: 9 * 2,
		borderRadius: 9
	},
	rowView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: '100%',
		height: screen.height * 0.05,
		// backgroundColor: backWhiteColor,
		padding: 5
	},
	iconView: {
		alignItems: 'flex-end',
		flex: 1.5
		// backgroundColor: 'transparent'
	},
	columnView: {
		flexDirection: 'column',
		alignContent: 'center'
	},
	rightIconStyle: {
		marginRight: 10
	},
	backgroundView: {
		borderRadius: 13
		// backgroundColor: Colors.grey100
	},
	titleText: {
		fontSize: 20,
		alignSelf: 'flex-start',
		fontFamily: 'NanumSquareBold',
		letterSpacing: -1,
		marginLeft: '5%',
		marginTop: 20
	},
	blankView: {
		height: 15
	},
	blankGreyView: {
		height: 20,

		marginTop: 20
	}
});
