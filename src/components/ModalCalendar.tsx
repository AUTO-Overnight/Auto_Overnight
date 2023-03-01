import dayjs from 'dayjs';
import React, { useCallback, useEffect } from 'react';
import { Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Colors } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import MakeAlarm from '../lib/help/MakeAlarm';
import { RootState } from '../store';
import {
	setCalendarModalMode,
	setCalendarModalVisible
} from '../store/calendar';
import { Button, CloseButton, ModalView, Text } from '../theme';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import constColors from '../constants/colors';
import { useCalendarTheme } from '../hooks';
dayjs.extend(utc);
dayjs.extend(timezone);

const screen = Dimensions.get('screen');

interface props {}

export function ModalCalendar() {
	const {
		calendarModalVisible,
		lastDayText,
		lastSubmitDay,
		calendarModalMode
	} = useSelector(({ calendar }: RootState) => ({
		calendarModalVisible: calendar.calendarModalVisible,
		lastDayText: calendar.lastDayText,
		lastSubmitDay: calendar.lastSubmitDay,
		calendarModalMode: calendar.calendarModalMode
	}));
	const dispatch = useDispatch();
	const onPressClose = useCallback(() => {
		dispatch(setCalendarModalVisible(false));
		dispatch(setCalendarModalMode('initial'));
	}, []);
	const onMakeSuccess = useCallback(() => {
		dispatch(setCalendarModalMode('loading'));
		setTimeout(() => {
			dispatch(setCalendarModalMode('success'));
		}, 1000);
	}, []);
	const onPressOkay = useCallback(() => {
		const date = dayjs(lastSubmitDay).set('h', 22).toDate();
		MakeAlarm({ endDate: date, color: '#fff', dispatch });
		dispatch(setCalendarModalMode('loading'));
	}, [lastSubmitDay]);
	const { isDark } = useCalendarTheme();
	return (
		<ModalView
			modalVisible={calendarModalVisible}
			ModalViewRender={() => (
				<>
					<CloseButton closeBtn={onPressClose} />
					{calendarModalMode === 'initial' && (
						<>
							<Text style={styles.titleText}>{lastDayText}</Text>
							<View style={styles.blankView} />
							<View
								style={[
									styles.buttonOverLine,
									{ borderColor: isDark ? Colors.grey100 : Colors.grey700 }
								]}
							/>
							<Button
								buttonNumber={2}
								buttonText="아니요"
								secondButtonText="네"
								onPressFunction={onMakeSuccess}
								secondOnPressFunction={onPressOkay}
							/>
						</>
					)}
					{calendarModalMode === 'loading' && <ActivityIndicator size={30} />}
					{calendarModalMode === 'success' && (
						<>
							<Text style={styles.titleText}>✅ 저장 되었습니다</Text>
							<View style={styles.blankView} />
							<View
								style={[
									styles.buttonOverLine,
									{ borderColor: isDark ? Colors.grey100 : Colors.grey700 }
								]}
							/>
							<Button
								buttonNumber={1}
								buttonText="확인"
								onPressFunction={onPressClose}
							/>
						</>
					)}
					{calendarModalMode === 'fail' && (
						<>
							<Text style={styles.titleText}>
								❌ 켈린더 권한을 승인해 주세요
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
								buttonText="확인"
								onPressFunction={onPressClose}
							/>
						</>
					)}
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
		alignSelf: 'center',
		fontFamily: 'NanumSquareR',
		letterSpacing: -1
		// marginLeft: '10%'
	},
	buttonOverLine: {
		borderTopWidth: 0.4,
		width: screen.width * 0.94,
		marginTop: 20,
		borderColor: constColors.mainDarkColor
	}
});
