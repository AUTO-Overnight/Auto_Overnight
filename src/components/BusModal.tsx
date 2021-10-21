import React, { useCallback, useState } from 'react';
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

import { useAutoFocus } from '../contexts';
//import { MaterialCommunityIcon as Icon } from '../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { min } from 'react-native-reanimated';
import { useIsDarkMode } from '../hooks/useIsDarkMode';
interface props {
	modalVisible: boolean;
	setModalVisible: any;
	start: number;
	end: number;
	mode: string;
	setMode: React.Dispatch<React.SetStateAction<string>>;
}

export function BusModal({
	modalVisible,
	setModalVisible,
	start,
	end,
	mode,
	setMode,
}: props) {
	const dispatch = useDispatch();
	const [minute, setMinute] = useState('');
	const focus = useAutoFocus();
	const onPressConfirm = useCallback(() => {}, [minute, mode]);

	return (
		// <AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.');
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View
						style={[
							styles.textView,
							{
								// marginBottom: 10,
							},
						]}
					>
						<TouchableHighlight
							activeOpacity={1}
							underlayColor={Colors.white}
							style={{
								// position: 'absolute',
								marginLeft: '90%',
								marginBottom: 10,
								width: '9%',
								// backgroundColor: 'blue',
							}}
							onPress={() => {
								setModalVisible(false);
							}}
						>
							<Icon style={{ alignSelf: 'flex-end' }} name="close" size={28} />
						</TouchableHighlight>
						<Text style={styles.titleText}>시간을 입력해주세요</Text>
						<View style={[styles.textInputView]}>
							<TextInput
								// onFocus={focus}
								style={[styles.textInput, { color: Colors.black }]}
								keyboardType={'number-pad'}
								value={minute}
								onChangeText={(min) => setMinute(min)}
								placeholder="00"
								placeholderTextColor={Colors.grey600}
							/>
							<Text style={styles.hourText}>{' : '}</Text>
							<TextInput
								// onFocus={focus}
								style={[styles.textInput, { color: Colors.black }]}
								keyboardType={'number-pad'}
								value={minute}
								onChangeText={(min) => setMinute(min)}
								placeholder="00"
								placeholderTextColor={Colors.grey600}
							/>
						</View>
					</View>
					<View style={styles.buttonRowView}>
						<TouchableHighlight
							activeOpacity={0.1}
							underlayColor={Colors.grey200}
							style={{
								...styles.closeButtonStyle,
								backgroundColor: useIsDarkMode
									? Colors.blue200
									: Colors.grey900,
							}}
							onPress={() => {
								onPressConfirm();
								setModalVisible(false);
							}}
						>
							<Text style={styles.buttonText}>확인</Text>
						</TouchableHighlight>
						{/* <View style={styles.verticalLine} /> */}
					</View>
					{/* <ModalMinute /> */}
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
		marginTop: -20,
	},
	modalView: {
		margin: 20,
		backgroundColor: Colors.white,
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
		width: '70%',
	},
	titleText: {
		textAlign: 'center',
		fontFamily: 'NanumSquareR',
		fontSize: 17,
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
		marginTop: -2,

		borderWidth: 0.3,
		padding: 5,
		borderRadius: 8,

		borderColor: Colors.blue300,

		marginRight: 10,
		marginLeft: 10,
	},
	textInputView: {
		flexDirection: 'row',
		// paddingBottom: 0.7,
		// borderBottomWidth: 0.3,
		justifyContent: 'center',
		// alignContent: 'center',
		// alignItems: 'center',
		alignSelf: 'center',
		width: '52%',
		// marginLeft: '30%',
		padding: 10,
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
		// justifyContent: 'center',
		// alignContent: 'center',
		marginBottom: -13,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	closeButtonStyle: {
		borderRadius: 8,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		elevation: 2,
		backgroundColor: Colors.blue300,
	},
	acceptButtonStyle: {
		padding: 15,
		width: '50%',
		height: '100%',
		borderRadius: 10,
		// backgroundColor: Colors.blue400,
	},
	modalText: {
		// marginBottom: 15,
		textAlign: 'center',
	},
	verticalLine: {
		height: '50%',
		borderLeftWidth: 0.16,
		width: 1,
	},
});
