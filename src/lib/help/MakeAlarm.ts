import React, { useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Button, Platform, Alert } from 'react-native';
import * as Calendar from 'expo-calendar';
import type { Source } from 'expo-calendar';
import * as Localization from 'expo-localization';
import dayjs from 'dayjs';
import { Colors } from 'react-native-paper';
import ko from 'dayjs/locale/ko';
import { Dispatch } from 'redux';
import { setCalendarModalMode } from '../../store/calendar';
dayjs.locale('ko');

interface props {
	endDate: Date;
	color: string;
	dispatch: Dispatch<any>;
}

export default function MakeAlarm({ endDate, color, dispatch }: props) {
	(async () => {
		const { status } = await Calendar.requestCalendarPermissionsAsync();
		if (status === 'granted') {
			const calendars = await Calendar.getCalendarsAsync(
				Calendar.EntityTypes.EVENT
			);
			Calendar.AlarmMethod.ALARM;
			const find = calendars.find((cal) => cal.title == '외박 신청');
			const defaultCalendarSource: Source | any =
				Platform.OS === 'ios'
					? await getDefaultCalendarSource()
					: { isLocalAccount: true, name: '외박 신청' };
			let calendar_id = '';
			if (find) {
				calendar_id = find.id;
			} else {
				const newCalendarID = await Calendar.createCalendarAsync({
					title: '외박 신청',
					color: '#33AAFC',
					entityType: Calendar.EntityTypes.EVENT,
					sourceId: defaultCalendarSource.id,
					source: defaultCalendarSource,
					name: '외박 신청',
					ownerAccount: 'personal',
					accessLevel: Calendar.CalendarAccessLevel.OWNER
				});
				calendar_id = newCalendarID;
			}
			// let recRule = {
			// 	frequency: 'weekly',
			// 	interval: 1,
			// 	endDate: endDate
			// };
			let example_event = {
				title: '외박신청',
				alarms: [
					{
						relativeOffset: -1 * 60,
						method: Calendar.AlarmMethod.ALERT
					}
				],
				notes: '모임',
				startDate: endDate,
				endDate: endDate,
				timeZone: Localization.timezone
			};
			Calendar.createEventAsync(calendar_id, example_event)
				.then((resp_id) => {
					setTimeout(() => {
						dispatch(setCalendarModalMode('success'));
					}, 1000);
				})
				.catch((err) => {
					setTimeout(() => {
						dispatch(setCalendarModalMode('fail'));
					}, 1000);
				});
			// });
		} else {
			setTimeout(() => {
				dispatch(setCalendarModalMode('fail'));
			}, 1000);
			// r
		}
	})();
}

async function getDefaultCalendarSource() {
	const defaultCalendar = await Calendar.getDefaultCalendarAsync();
	return defaultCalendar.source;
}
