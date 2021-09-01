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
export function useModal(): {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	ModalView: ReactNode;
} {
	const [modalVisible, setModalVisible] = useState(false);
	const ModalView: ReactNode = useCallback(() => {
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>시작일을 클릭해 주세요</Text>

						<TouchableHighlight
							style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
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
	}, [modalVisible]);
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
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
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
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});
