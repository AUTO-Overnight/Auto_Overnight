import dayjs from 'dayjs';
import React, { useCallback, useEffect } from 'react';
import {
	Dimensions,
	StyleSheet,
	View,
	ActivityIndicator,
	Linking,
	Platform
} from 'react-native';
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
	const onMakeSuccess = useCallback(() => {}, []);

	const onPressOkay = useCallback(() => {
		Platform.OS === 'ios'
			? Linking.openURL(`https://apps.apple.com/kr/app/we-meet/id1610966012`)
			: Linking.openURL(
					`https://play.google.com/store/apps/details?id=com.ww8007.weMeet`
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
						<Text style={styles.subText}>
							{` 1. 서랍창 디자인 변경\n 2. 최종 신청일 기준 캘린더 알람 설정\n 3. 영문 → 한글`}
						</Text>
						<View style={{ height: 15 }} />
						<Text style={styles.titleText}>새소식</Text>
						<Text style={styles.subText}>
							{` 저의 새로운 앱이 출시 되었습니다! 조별과제나\n 모임 약속 잡으실 때 사용해 보세요 [We Meet]\n\n 또한 외박 신청 앱 유지보수에 관심 있는 분은\n 개인 연락 주세요 😃`}
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
		// marginLeft: '10%'
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
