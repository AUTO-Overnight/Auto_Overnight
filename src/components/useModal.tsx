import React, { useCallback, useState } from 'react';
import type { FC } from 'react';
import {
	Alert,
	Modal,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from 'react-native';
import type { ReactNode } from 'react';
import { Colors } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

interface modalText {
	text: string;
	title: string;
}

export function useModal({ text, title }: modalText): {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	ModalView: FC;
} {
	const [modalVisible, setModalVisible] = useState(false);
	const isDark = useTheme().dark;
	const textLength = text.length ? true : false;
	const ModalView = useCallback(() => {
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
						<Text
							style={[
								styles.textStyle,
								{ color: isDark ? Colors.white : Colors.grey800 },
							]}
						>
							{title}
						</Text>
						{textLength && (
							<Text
								style={[
									styles.modalText,
									{ color: isDark ? Colors.white : Colors.grey800 },
								]}
							>
								{text}
							</Text>
						)}

						<TouchableHighlight
							style={{
								...styles.openButton,
								backgroundColor: isDark ? '#518f9b' : Colors.blue200,
							}}
							onPress={() => {
								setModalVisible(!modalVisible);
							}}
						>
							<Text
								style={[
									styles.textStyle,
									{ color: isDark ? Colors.white : Colors.grey800 },
								]}
							>
								확인
							</Text>
						</TouchableHighlight>
					</View>
				</View>
			</Modal>
		);
	}, [modalVisible, isDark]);
	return { modalVisible, setModalVisible, ModalView };
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: Colors.white,
		borderRadius: 12,
		padding: 35,
		alignItems: 'center',
		shadowColor: Colors.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	openButton: {
		borderRadius: 8,
		padding: 10,
		paddingLeft: 25,
		paddingRight: 25,
		elevation: 2,
	},
	textStyle: {
		color: Colors.white,
		textAlign: 'center',
		// textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		fontSize: 14,
		textAlign: 'left',
		color: Colors.white,
	},
});
