import React, { useCallback } from 'react';
import { Dimensions, StyleSheet, View, Linking, Platform } from 'react-native';
import { Colors } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import MakeAlarm from '../lib/help/MakeAlarm';
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
						<Text style={styles.subText}>{` 1. 앱스토어 출시`}</Text>
						<Text style={styles.subText}>{` 2. 로그인 관련 오류 수정`}</Text>
						<View style={{ height: 15 }} />
						<Text style={styles.titleText}>새소식</Text>
						<Text style={styles.subText}>
							{` ⭐️드디어 앱 스토어에 정식 출시 되었습니다⭐️\n 앱스토어 개발자 등록 비용 때문에 부득이 하게\n 광고를 넣게 되었습니다... \n 양해 부탁 드리겠습니다 😂 `}
						</Text>
						<View style={styles.blankView} />
						<View style={styles.buttonOverLine} />
						<Button
							buttonNumber={2}
							buttonText="아니요"
							secondButtonText="설치해 보기"
							onPressFunction={onPressClose}
							secondOnPressFunction={onPressOkay}
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
		width: screen.width * 0.9,
		marginTop: 20,
		borderColor: Colors.black
	}
});
