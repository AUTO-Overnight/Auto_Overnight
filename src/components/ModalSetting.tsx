import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Colors } from 'react-native-paper';
import { Button, CloseButton, ModalView, Text } from '../theme';
import Font5Icon from 'react-native-vector-icons/FontAwesome5';
import { useToggleTheme } from '../contexts';
import { useTheme } from '@react-navigation/native';
import constColors from '../constants/colors';

const screen = Dimensions.get('screen');

interface props {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalSetting({ modalVisible, setModalVisible }: props) {
	const [buttons] = useState([
		{
			radius: {
				// borderBottomLeftRadius: 0,
				// borderBottomRightRadius: 0
			},
			text: '화이트/다크 모드',
			iconName: 'user-edit',
			iconSize: 21,
			onPressFunction: useToggleTheme()
		}
	]);
	const onPressCloseBtn = useCallback(() => {
		setModalVisible(false);
	}, []);
	const isDark = useTheme().dark;
	return (
		<ModalView
			modalVisible={modalVisible}
			setModalVisible={setModalVisible}
			ModalViewRender={() => (
				<>
					<CloseButton closeBtn={onPressCloseBtn} />
					<Text style={styles.titleText}>화면 설정</Text>
					<View style={styles.blankView} />
					<View style={styles.backgroundView}>
						<View style={styles.columnView}>
							{buttons.map((button) => (
								<TouchableHighlight
									activeOpacity={1}
									underlayColor={isDark ? '#132A52' : Colors.white}
									onPress={button.onPressFunction}
									key={button.text}
									style={[styles.touchButtonStyle, button.radius]}
								>
									<View style={styles.rowView}>
										<Font5Icon
											name={button.iconName}
											size={button.iconSize}
											color={Colors.blue500}
											style={styles.iconStyle}
										/>
										<Text
											style={[
												styles.touchText,
												{ color: constColors.mainDarkColor }
											]}
										>
											{' '}
											{button.text}
										</Text>
										<View style={styles.iconView}>
											<Font5Icon
												name="angle-right"
												size={19}
												color={constColors.mainDarkColor}
												style={styles.rightIconStyle}
											/>
										</View>
									</View>
								</TouchableHighlight>
							))}
						</View>
					</View>
					<View style={styles.blankView} />
					<View
						style={[
							styles.buttonOverLine,
							{ borderColor: isDark ? Colors.grey100 : Colors.grey700 }
						]}
					/>
					<Button
						buttonNumber={2}
						buttonText="닫기"
						secondButtonText="변경하기"
						onPressFunction={onPressCloseBtn}
						secondOnPressFunction={useToggleTheme()}
					/>
				</>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	titleText: {
		fontSize: 20,
		alignSelf: 'flex-start',
		fontFamily: 'NanumSquareBold',
		letterSpacing: -1,
		marginLeft: '10%'
	},
	blankView: {
		height: 15
	},
	backgroundView: {
		borderRadius: 13,
		backgroundColor: Colors.grey100
	},
	columnView: {
		flexDirection: 'column',
		alignContent: 'center'
	},
	touchButtonStyle: {
		padding: 5,
		borderRadius: 13,
		justifyContent: 'center',
		paddingLeft: 5,
		paddingRight: 5
	},
	rowView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: screen.width * 0.65,
		height: screen.height * 0.05,
		borderRadius: 13
	},
	iconStyle: {
		marginLeft: 10
	},
	rightIconStyle: {
		marginRight: 10
	},
	touchText: {
		fontSize: 14,
		textAlign: 'center',
		fontFamily: 'NanumSquareR',
		letterSpacing: -1,
		position: 'absolute',
		left: '16%',
		justifyContent: 'center',
		textAlignVertical: 'center'
	},
	iconView: {
		alignItems: 'flex-end',
		flex: 1
	},
	buttonOverLine: {
		borderTopWidth: 0.4,
		width: screen.width * 0.94,
		marginTop: 20,
		borderColor: constColors.mainDarkColor
	}
});
