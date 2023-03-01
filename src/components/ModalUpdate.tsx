import React, { useCallback } from 'react';
import { Dimensions, StyleSheet, View, Linking, Platform } from 'react-native';
import { Colors, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import constColors from '../constants/colors';
import { RootState } from '../store';
import { setUpdateModalVisible } from '../store/calendar';

import { Button, CloseButton, ModalView, Text } from '../theme';

const screen = Dimensions.get('screen');

interface props {}

export function ModalUpdate() {
	const { updateModalVisible } = useSelector(({ calendar }: RootState) => ({
		updateModalVisible: calendar.updateModalVisible
	}));
	const dispatch = useDispatch();
	const onPressClose = useCallback(() => {
		dispatch(setUpdateModalVisible(false));
	}, []);

	const isDark = useTheme().dark;

	const onPressOkay = useCallback(() => {
		Platform.OS === 'ios'
			? Linking.openURL(
					`https://apps.apple.com/us/app/%ED%95%9C%EA%B5%AD%EA%B3%B5%ED%95%99%EB%8C%80%ED%95%99%EA%B5%90-%EC%99%B8%EB%B0%95-%EC%8B%A0%EC%B2%AD/id1618680471`
			  )
			: Linking.openURL(
					`https://apps.apple.com/us/app/%ED%95%9C%EA%B5%AD%EA%B3%B5%ED%95%99%EB%8C%80%ED%95%99%EA%B5%90-%EC%99%B8%EB%B0%95-%EC%8B%A0%EC%B2%AD/id1618680471`
			  );
	}, []);
	return (
		<ModalView
			modalVisible={updateModalVisible}
			ModalViewRender={() => (
				<>
					<CloseButton closeBtn={onPressClose} />

					<>
						<Text style={styles.titleText}>주요 업데이트</Text>
						<Text
							style={styles.subText}
						>{` 1. 로그인 에러 관련 설명 추가`}</Text>
						{/* <Text style={styles.subText}>{` 2. 디자인 변경`}</Text> */}
						<View style={{ height: 15 }} />
						<Text style={styles.titleText}>변경사항</Text>
						<Text style={styles.subText}>
							{`1. 로그인 화면에서의 로그인 에러 관련 설명이 추가 되었습니다. `}
							{/* {` \n 2.달력의 디자인과 다크 모드 디자인이 변경 되었습니다. `} */}
						</Text>
						<View style={styles.blankView} />
						<View
							style={[
								styles.buttonOverLine,
								{ borderColor: isDark ? Colors.grey100 : Colors.grey700 }
							]}
						/>
						<Button
							buttonNumber={1}
							buttonText="닫기"
							onPressFunction={onPressClose}
						/>
					</>
				</>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	blankView: {
		height: 15
	},
	titleText: {
		fontSize: 17,
		alignSelf: 'flex-start',
		fontFamily: 'NanumSquareBold',
		letterSpacing: -1,
		marginBottom: 10
	},
	subText: {
		fontSize: 15,
		alignSelf: 'flex-start',
		fontFamily: 'NanumSquareR',
		letterSpacing: -1,
		marginLeft: 15
	},
	buttonOverLine: {
		borderTopWidth: 0.4,
		width: screen.width * 0.94,
		marginTop: 20,
		borderColor: constColors.mainDarkColor
	}
});
