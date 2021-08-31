import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { Button, Colors } from 'react-native-paper';
// prettier-ignore
import {SafeAreaView, View, NavigationHeader, MaterialCommunityIcon as Icon, Text, TouchableView} from '../theme';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import { ActivityIndicator, Text as RNText } from 'react-native';
import { LeftRightNavigation, LeftRightNavigationMethods } from '../components';
export default function Week() {
	const navigation = useNavigation();
	const open = useCallback(() => {
		navigation.dispatch(DrawerActions.openDrawer());
	}, []);
	const logout = useCallback(() => {
		navigation.navigate('Login');
	}, []);
	const goLeft = useCallback(() => navigation.navigate('Home'), []);
	const [loading, setLoading] = useState<boolean>(false);
	// useEffect(() => {
	// 	const id = setTimeout(() => setLoading(false), 3000);
	// 	return () => clearTimeout(id);
	// }, [loading]);
	const leftRef = useRef<LeftRightNavigationMethods | null>(null);
	const pressLoading = useCallback(() => {
		setLoading((loading) => !loading);
		const id = setTimeout(() => setLoading((loading) => !loading), 3000);
		return clearTimeout(id);
	}, [loading]);
	const [buttonList] = useState([
		{
			iconName: 'lock-outline',
			text: '1일 신청',
			color: 'white',
		},
		{
			iconName: 'lock-outline',
			text: '1주 신청',
			color: 'white',
		},
		{
			iconName: 'lock-outline',
			text: '2주 신청',
			color: 'white',
		},
		{
			iconName: 'lock-outline',
			text: '4주 신청',
			color: 'white',
		},
	]);
	return (
		<SafeAreaView>
			<View style={[styles.view]}>
				<NavigationHeader
					title="Week"
					Left={() => <Icon name="menu" size={35} onPress={open} />}
					Right={() => <Icon name="logout" size={35} onPress={logout} />}
				/>
				<View style={{ flex: 1 }} />
				{buttonList.map((list) => (
					<TouchableView
						key={list.text}
						// onPress={pressLoading}
						style={[
							styles.touchableView,
							{ backgroundColor: Colors.blue300, marginBottom: 30 },
						]}
					>
						{!loading && (
							<Text
								style={{ color: list.color, fontSize: 18, fontWeight: '700' }}
							>
								{list.text}
							</Text>
						)}
						{loading && <ActivityIndicator size="large" />}
					</TouchableView>
				))}
				<LeftRightNavigation
					ref={leftRef}
					distance={40}
					onLeftToRight={goLeft}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	view: { flex: 1 },
	touchableView: {
		marginTop: 30,
		flexDirection: 'row',
		height: 50,
		borderRadius: 10,
		width: '90%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
});
