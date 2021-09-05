/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useCallback } from 'react';
import { StyleSheet } from 'react-native';
// prettier-ignore
import {View, Text, NavigationHeader, UnderlineText,
MaterialCommunityIcon as Icon, Switch} from '../theme';
import type { FC } from 'react';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { Avatar, TouchableView } from '../components';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

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

	return (
		<DrawerContentScrollView {...props} contentContainerStyle={[styles.view]}>
			<NavigationHeader
				Right={() => <Icon name="close" size={24} onPress={close} />}
			/>
			<View style={[styles.row]}>
				<Switch style={[styles.row, { marginLeft: 10 }]} />
				<Text style={styles.switchText}>Default / Dark </Text>
			</View>
			<View style={[styles.content]}>
				<View style={[styles.row]}>
					{/* <Avatar uri={loginUser.avatar} size={40} /> */}
					<Text style={[styles.text, styles.m]}>안녕하세요 {name}님</Text>
				</View>
				<View style={[styles.row]}>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={[styles.text, styles.m]}
					>
						ID : {id}
					</Text>
				</View>
				<View style={styles.line} />
				<TouchableView
					style={[styles.touchableView, { backgroundColor: 'white' }]}
				>
					<Text style={styles.text}>문의/건의 사항</Text>
					{/* <Icon name="login" size={24}></Icon> */}
				</TouchableView>
			</View>
		</DrawerContentScrollView>
	);
};
export default DrawerContent;
const styles = StyleSheet.create({
	view: { flex: 1, padding: 5 },
	row: { flexDirection: 'row', padding: 10, alignItems: 'center' },
	col: { flexDirection: 'column', padding: 10, alignItems: 'center' },
	m: { marginLeft: 5 },
	text: { fontSize: 20 },
	touchableView: {
		marginTop: 10,
		flexDirection: 'row',
		height: 50,
		borderRadius: 10,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: { flex: 1, padding: 5 },
	line: {
		marginTop: 10,
		borderBottomColor: 'white',
		borderBottomWidth: 3,
	},
	switchText: {
		fontSize: 20,
		marginLeft: 5,
	},
});
