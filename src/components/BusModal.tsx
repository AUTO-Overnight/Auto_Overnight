import React, { useCallback, useState, useEffect } from 'react';
import {
	Alert,
	Modal,
	StyleSheet,
	TouchableHighlight,
	TextInput,
	Text,
	View,
} from 'react-native';
import { Colors } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');
import { useClock } from '../hooks';
import makeBusTime from '../lib/help/makeBusTime';
import { MaterialCommunityIcon as Icon } from '../theme';
import DropDownPicker from 'react-native-dropdown-picker';

const inputHeight = 35;

interface props {
	modalVisible: boolean;
	setModalVisible: any;
	isDark: boolean;
}

export function BusModal({ modalVisible, setModalVisible, isDark }: props) {
	const [realTime, setTime] = useState(dayjs().format('A hh : mm : ss')); // -1-
	useEffect(() => {
		const id = setTimeout(() => {
			setTime(dayjs().format('A hh : mm : ss'));
		}, 1000);
		return () => clearTimeout(id);
	}, [realTime]);
	const [hour, setHour] = useState('');
	const [minute, setMinute] = useState('');
	const [mode, setMode] = useState(1);
	const [goSchool, setGoSchool] = useState(true);
	const time = useClock();
	const [busText, setBusText] = useState('');
	const [busArray, setBusArray] = useState([]);
	const [busHour, setBusHour] = useState(0);
	//DropdownPicker
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');
	const [items, setItems] = useState([
		{ label: '오후', value: '오후' },
		{ label: '오전', value: '오전' },
	]);
	// console.log(time);
	const onPressConfirm = useCallback(() => {
		if (value === '오전') {
			if (Number(hour) > 12 || Number(minute) > 60) {
				Alert.alert('설정할 수 없는 시간 입니다');
				return;
			}
			const { returnText, h, busArray } = makeBusTime(
				Number(hour),
				Number(minute),
				goSchool
			);
			setBusText(returnText);
			setBusArray(busArray);
			setBusHour(h);
			setMode(2);
		} else {
			if (Number(hour) > 12 || Number(minute) > 60) {
				Alert.alert('설정할 수 없는 시간 입니다');
				return;
			}
			const { returnText, h, busArray } = makeBusTime(
				Number(hour) + 12,
				Number(minute),
				goSchool
			);
			setBusText(returnText);
			setBusArray(busArray);
			setBusHour(h);
			setMode(2);
		}
	}, [minute, hour, modalVisible, goSchool, value]);

	useEffect(() => {
		const timeParse = time.split(' ');
		setValue(timeParse[0]);
		setHour(timeParse[1]);
		setMinute(timeParse[2]);
	}, [modalVisible]);

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.');
			}}
		>
			<View style={styles.centeredView}>
				<View
					style={{
						...styles.modalView,
						backgroundColor: isDark ? '#222831' : Colors.white,
					}}
				>
					<View
						style={[
							styles.textView,
							{ backgroundColor: isDark ? '#222831' : Colors.white },
						]}
					>
						<TouchableHighlight
							activeOpacity={1}
							underlayColor={isDark ? '#222831' : Colors.white}
							style={{
								marginLeft: '90%',
								marginBottom: 10,
								width: '9%',
							}}
							onPress={() => {
								setModalVisible(false);
							}}
						>
							<Icon style={{ alignSelf: 'flex-end' }} name="close" size={28} />
						</TouchableHighlight>
						{mode === 1 && (
							<>
								<Text
									style={[
										styles.titleText,
										{ color: isDark ? Colors.white : Colors.grey800 },
									]}
								>
									시간을 입력해주세요
								</Text>
								<View
									style={[
										styles.goBackView,
										{ backgroundColor: isDark ? '#222831' : Colors.white },
									]}
								>
									<TouchableHighlight
										activeOpacity={1}
										underlayColor={isDark ? '#222831' : Colors.grey200}
										style={{
											...styles.goBackTouchView,
											backgroundColor: goSchool
												? isDark
													? '#41727c'
													: '#c8e473'
												: isDark
												? '#222831'
												: Colors.white,
										}}
										onPress={() => {
											setGoSchool(true);
										}}
									>
										<Text
											style={[
												styles.buttonText,
												{ color: isDark ? Colors.white : Colors.grey800 },
											]}
										>
											등교
										</Text>
									</TouchableHighlight>
									<TouchableHighlight
										activeOpacity={1}
										underlayColor={isDark ? '#222831' : Colors.grey200}
										style={{
											...styles.goBackTouchView,
											backgroundColor: goSchool
												? isDark
													? '#222831'
													: Colors.white
												: isDark
												? '#41727c'
												: '#c8e473',
										}}
										onPress={() => {
											setGoSchool(false);
										}}
									>
										<Text
											style={[
												styles.buttonText,
												{ color: isDark ? Colors.white : Colors.grey800 },
											]}
										>
											하교
										</Text>
									</TouchableHighlight>
								</View>
								<Text
									style={[
										styles.buttonText,
										{
											color: isDark ? Colors.white : Colors.grey800,
											marginTop: 8,
											marginBottom: 8,
										},
									]}
								>
									현재시간 [ {realTime} ]
								</Text>
								<View style={[styles.textInputView]}>
									<View
										style={{
											flex: 0.8,
											flexShrink: 0.7,
											flexGrow: 0.7,
										}}
									>
										<DropDownPicker
											style={{
												height: inputHeight,
												alignSelf: 'center',
												justifyContent: 'center',
												alignItems: 'center',
												backgroundColor: isDark ? '#222831' : Colors.white,
												borderWidth: 0.5,

												borderRadius: 8,
												borderColor: Colors.blue300,
											}}
											containerStyle={{
												backgroundColor: isDark ? '#222831' : Colors.white,
												borderRadius: 8,
												borderColor: Colors.blue300,
											}}
											textStyle={{
												fontFamily: 'NanumSquareR',
												color: isDark ? Colors.white : Colors.grey800,
												borderColor: Colors.blue300,
												fontSize: 12,
											}}
											labelStyle={{
												backgroundColor: isDark ? '#222831' : Colors.white,
												color: isDark ? Colors.white : Colors.grey800,
											}}
											dropDownContainerStyle={{
												backgroundColor: isDark ? '#222831' : Colors.white,
												borderRadius: 8,
												borderColor: Colors.blue300,
											}}
											open={open}
											value={value}
											items={items}
											placeholder={items[0].value}
											setOpen={setOpen}
											setValue={setValue}
											setItems={setItems}
										/>
									</View>
									<TextInput
										style={[
											styles.textInput,
											{ color: isDark ? Colors.white : Colors.grey800 },
										]}
										keyboardType={'number-pad'}
										value={hour}
										onChangeText={(hour) => setHour(hour)}
										placeholder="00"
										placeholderTextColor={Colors.grey600}
									/>
									<Text
										style={[
											styles.hourText,
											{ color: isDark ? Colors.white : Colors.grey800 },
										]}
									>
										{' : '}
									</Text>
									<TextInput
										style={[
											styles.textInput,
											{ color: isDark ? Colors.white : Colors.grey800 },
										]}
										keyboardType={'number-pad'}
										value={minute}
										onChangeText={(min) => setMinute(min)}
										placeholder="00"
										placeholderTextColor={Colors.grey600}
									/>
								</View>
								<View style={styles.buttonRowView}>
									<TouchableHighlight
										activeOpacity={0.1}
										underlayColor={isDark ? '#222831' : Colors.grey200}
										style={{
											...styles.closeButtonStyle,
											backgroundColor: isDark ? '#518f9b' : Colors.blue200,
										}}
										onPress={() => {
											Number(hour) > 24
												? Alert.alert('지정할 수 없는 시간 입니다')
												: onPressConfirm();
											Number(minute) > 60
												? Alert.alert('지정할 수 없는 시간 입니다')
												: onPressConfirm();
										}}
									>
										<Text
											style={[
												styles.buttonText,
												{ color: isDark ? Colors.white : Colors.grey800 },
											]}
										>
											확인
										</Text>
									</TouchableHighlight>
								</View>
							</>
						)}
						{mode === 2 && (
							<>
								<View style={styles.timeColView}>
									{busArray && (
										<View style={{ flexDirection: 'column' }}>
											<Text
												style={[
													styles.busTimeText,
													{ color: isDark ? Colors.white : Colors.grey800 },
												]}
											>
												{busHour >= 12 ? busHour - 12 : busHour}시 버스 운행표
											</Text>
											<View
												style={{
													flexDirection: 'row',
													justifyContent: 'center',
													marginBottom: 10,
												}}
											>
												{busArray.map(
													(b) =>
														b !== 90 && (
															<Text
																key={b}
																style={
																	(styles.modalText,
																	{
																		textAlign: 'center',
																		color: isDark
																			? Colors.white
																			: Colors.grey800,
																	})
																}
															>
																{' '}
																[ {b}분 ]{' '}
															</Text>
														)
												)}
											</View>
											<Text
												style={[
													styles.modalText,
													{ color: isDark ? Colors.white : Colors.grey800 },
												]}
											>
												설정 시간 : {hour}시 {minute}분
											</Text>
										</View>
									)}

									<Text
										style={[
											styles.modalText,
											{ color: isDark ? Colors.white : Colors.grey800 },
										]}
									>
										{busText}
									</Text>
								</View>
								<View style={styles.iconTextRowView}>
									<View style={styles.buttonRowView}>
										<TouchableHighlight
											activeOpacity={0.1}
											underlayColor={isDark ? '#222831' : Colors.grey200}
											style={{
												...styles.closeButtonStyle,
												backgroundColor: isDark ? '#345B63' : '#c8e473',
											}}
											onPress={() => {
												setMode(1);
											}}
										>
											<Text
												style={[
													styles.buttonText,
													{ color: isDark ? Colors.white : Colors.grey800 },
												]}
											>
												이전
											</Text>
										</TouchableHighlight>
									</View>
									<View style={styles.buttonRowView}>
										<TouchableHighlight
											activeOpacity={0.1}
											underlayColor={isDark ? '#222831' : Colors.grey200}
											style={{
												...styles.closeButtonStyle,
												backgroundColor: isDark ? '#518f9b' : Colors.blue200,
											}}
											onPress={() => {
												setMode(1);
												setModalVisible(false);
											}}
										>
											<Text
												style={[
													styles.buttonText,
													{ color: isDark ? Colors.white : Colors.grey800 },
												]}
											>
												확인
											</Text>
										</TouchableHighlight>
									</View>
								</View>
							</>
						)}
					</View>
				</View>
			</View>
		</Modal>
		// </AutoFocusProvider>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		// marginTop: -20,
	},
	modalView: {
		margin: 20,

		borderRadius: 12,
		padding: 15,
		paddingBottom: 40,
		alignItems: 'center',
		shadowColor: Colors.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		width: '75%',
	},
	titleText: {
		textAlign: 'center',
		fontFamily: 'NanumSquareR',
		fontSize: 19,
		marginBottom: 15,
	},
	busTimeText: {
		textAlign: 'center',
		fontFamily: 'NanumSquareBold',
		fontSize: 17,
		marginBottom: 10,
	},
	subText: {
		textAlign: 'center',
		fontFamily: 'NanumSquareR',
		fontSize: 15,
		marginBottom: 15,
	},
	textView: {
		width: '100%',
		//
	},
	hourText: {
		fontSize: 17,
		marginTop: 5,
		fontFamily: 'NanumSquareR',
	},
	textInput: {
		fontSize: 20,
		fontFamily: 'NanumSquareR',
		borderWidth: 0.5,
		borderRadius: 8,
		borderColor: Colors.blue300,
		paddingLeft: 13,
		paddingRight: 13,
		marginRight: 10,
		marginLeft: 10,
	},
	textInputView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignSelf: 'center',
		height: inputHeight,
		marginTop: 8,
		marginBottom: 8,
	},
	buttonText: {
		textAlign: 'center',
		fontFamily: 'NanumSquareR',
	},
	buttonRowView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		marginTop: 10,
		marginBottom: -13,
	},
	timeColView: {
		flexDirection: 'column',
	},
	iconTextRowView: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignContent: 'center',
	},
	goBackView: {
		flexDirection: 'row',
		justifyContent: 'center',

		alignContent: 'center',
		alignSelf: 'center',
	},
	goBackTouchView: {
		borderRadius: 8,
		padding: 7,
		paddingLeft: 13,
		paddingRight: 13,
		marginRight: 16,
		marginLeft: 16,
		marginBottom: 5,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	closeButtonStyle: {
		borderRadius: 8,
		padding: 10,
		paddingLeft: 25,
		paddingRight: 25,
		elevation: 2,
		backgroundColor: Colors.blue200,
	},
	acceptButtonStyle: {
		padding: 15,
		width: '50%',
		height: '100%',
		borderRadius: 10,
	},
	modalText: {
		textAlign: 'center',
		fontFamily: 'NanumSquareR',
		marginBottom: 10,
	},
	verticalLine: {
		height: '50%',
		borderLeftWidth: 0.16,
		width: 1,
	},
});
