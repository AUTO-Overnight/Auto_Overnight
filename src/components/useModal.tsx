import React, { useCallback, useState } from 'react';
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
export function useModal({ text }): {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	ModalView: ReactNode;
} {
	const [modalVisible, setModalVisible] = useState(false);
	const isDark = useTheme().dark;
	const ModalView: ReactNode = useCallback(() => {
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
								styles.modalText,
								{ color: isDark ? Colors.white : Colors.black },
							]}
						>
							{text}
						</Text>

						<TouchableHighlight
							style={{
								...styles.openButton,
								backgroundColor: isDark ? Colors.grey900 : '#2e8b57',
							}}
							onPress={() => {
								setModalVisible(!modalVisible);
							}}
						>
							<Text style={styles.textStyle}>O K</Text>
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
		borderRadius: 20,
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
		backgroundColor: '#F194FF',
		borderRadius: 10,
		padding: 10,
		paddingLeft: 20,
		paddingRight: 20,
		elevation: 2,
	},
	textStyle: {
		color: Colors.white,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		fontSize: 15,
		textAlign: 'center',
		color: Colors.white,
	},
});
