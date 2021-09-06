/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useCallback } from 'react';
import { StyleSheet, Linking } from 'react-native';
// prettier-ignore
import {View, Text, NavigationHeader, UnderlineText,
MaterialCommunityIcon as Icon, Switch} from '../theme';
import type { FC } from 'react';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerActions, useTheme } from '@react-navigation/native';
import { Avatar, TouchableView } from '../components';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Colors } from 'react-native-paper';
const backWhiteColor = '#FFFF';
const DrawerContent: FC<DrawerContentComponentProps> = (props) => {
	const { name, id } = useSelector(({ login }: RootState) => ({
		name: login.name,
		id: login.id,
	}));
	const { navigation } = props;
	const close = useCallback(
		() => navigation.dispatch(DrawerActions.closeDrawer()),
		[]
	);
	const isDark = useTheme().dark;
	const onClickOpenChat = useCallback(() => {
		Linking.openURL('https://open.kakao.com/o/sA4uughd');
	}, []);
	const onReload = useCallback(() => {}, []);
	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={[
				styles.view,
				{ backgroundColor: isDark ? Colors.black : backWhiteColor },
			]}
		>
			<NavigationHeader
				Right={() => <Icon name="close" size={30} onPress={close} />}
			/>
			<View style={{ backgroundColor: isDark ? Colors.black : backWhiteColor }}>
				<View
					style={[
						styles.content,
						{ backgroundColor: isDark ? Colors.black : backWhiteColor },
					]}
				>
					<View
						style={[
							styles.row,
							{ backgroundColor: isDark ? Colors.black : backWhiteColor },
						]}
					>
						<Text style={styles.switchText}>Default / Dark </Text>
						<Switch style={[styles.row, { marginLeft: 10 }]} />
					</View>
				</View>
				<View
					style={[
						styles.content,
						{ backgroundColor: isDark ? Colors.black : backWhiteColor },
					]}
				>
					<View
						style={[
							styles.row,
							{ backgroundColor: isDark ? Colors.black : backWhiteColor },
						]}
					>
						{/* <Avatar uri={loginUser.avatar} size={40} /> */}
						<Text style={[styles.text, styles.m]}>안녕하세요 {name}님</Text>
					</View>
					<View
						style={[
							styles.row,
							{ backgroundColor: isDark ? Colors.black : backWhiteColor },
						]}
					>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={[styles.text, styles.m]}
						>
							ID : {id}
						</Text>
					</View>

					<View
						style={[
							styles.line,
							{ borderBottomColor: isDark ? 'white' : Colors.black },
						]}
					/>
					<View
						style={[
							styles.rowCircle,
							{ backgroundColor: isDark ? '#152D35' : backWhiteColor },
						]}
					>
						<View
							style={[styles.circle, { backgroundColor: Colors.yellow500 }]}
						/>
						<Text style={styles.text}>승인</Text>
						<View style={[styles.circle, { backgroundColor: Colors.red500 }]} />
						<Text style={styles.text}>미승인</Text>
					</View>
					<View
						style={[
							styles.line,
							{ borderBottomColor: isDark ? 'white' : Colors.black },
						]}
					/>
					<TouchableView
						onPress={onClickOpenChat}
						style={[
							styles.touchableView,
							{ backgroundColor: isDark ? '#152D35' : Colors.red300 },
						]}
					>
						<Text style={styles.buttonText}>문의/건의 사항</Text>
					</TouchableView>
					<TouchableView
						onPress={onClickOpenChat}
						style={[
							styles.touchableView,
							{ backgroundColor: isDark ? '#152D35' : Colors.red300 },
						]}
					>
						<Text style={styles.buttonText}>설문조사</Text>
					</TouchableView>
				</View>
			</View>
		</DrawerContentScrollView>
	);
};
export default DrawerContent;
const styles = StyleSheet.create({
	view: { flex: 1, padding: 5 },
	row: {
		flexDirection: 'row',
		padding: 10,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	rowCircle: {
		flexDirection: 'row',
		padding: 15,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	col: { flexDirection: 'column', padding: 10, alignItems: 'center' },
	m: { marginLeft: 5 },
	text: { fontSize: 20 },
	buttonText: {
		fontSize: 20,
		color: Colors.white,
	},
	touchableView: {
		marginTop: 20,
		flexDirection: 'column',
		height: 50,
		marginLeft: 5,
		borderRadius: 10,
		width: '95%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: { padding: 5 },
	line: {
		borderBottomWidth: 3,
	},
	switchText: {
		fontSize: 20,
		marginLeft: 5,
	},
	circle: {
		width: 12 * 2,
		height: 12 * 2,
		borderRadius: 12,
	},
});
