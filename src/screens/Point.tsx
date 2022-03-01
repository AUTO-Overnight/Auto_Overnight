import React, { useCallback, useRef } from 'react';
import { Colors } from 'react-native-paper';
// prettier-ignore
import {SafeAreaView, View, NavigationHeader, MaterialCommunityIcon as Icon, Text, TouchableView} from '../theme';
import {
	DrawerActions,
	useNavigation,
	useTheme
} from '@react-navigation/native';
import { ScrollView, StyleSheet } from 'react-native';
import { LeftRightNavigation, LeftRightNavigationMethods } from '../components';
import { BonusTable } from '../components';
import { TouchHeaderIconView } from '../theme/navigation/TochHeaderIconView';
import { StatusBar } from 'expo-status-bar';
export default function Point() {
	const navigation = useNavigation();
	const open = useCallback(() => {
		navigation.dispatch(DrawerActions.openDrawer());
	}, []);
	const logout = useCallback(() => {
		navigation.navigate('Login');
	}, []);
	const goLeft = useCallback(() => navigation.navigate('Calendar'), []);
	const leftRef = useRef<LeftRightNavigationMethods | null>(null);
	const isDark = useTheme().dark;
	return (
		<SafeAreaView
			style={{ backgroundColor: isDark ? Colors.black : '#EDF3F7' }}
		>
			<View
				style={[
					styles.view,
					{ backgroundColor: isDark ? Colors.black : '#EDF3F7' }
				]}
			>
				<ScrollView>
					<StatusBar style={isDark ? 'light' : 'dark'} />
					<NavigationHeader
						title="상/벌점"
						Left={() => (
							<TouchHeaderIconView
								underlayColor={isDark ? 'black' : '#EDF3F7'}
								onPress={open}
							>
								<Icon name="menu" size={33} style={{ marginLeft: 10 }} />
							</TouchHeaderIconView>
						)}
						// Right={() => (
						// 	<Icon
						// 		name="logout"
						// 		size={35}
						// 		onPress={logout}
						// 		style={{ marginRight: '3%' }}
						// 	/>
						// )}
					/>
					<BonusTable isDark={isDark} />
					<LeftRightNavigation
						ref={leftRef}
						distance={40}
						onLeftToRight={goLeft}
					/>
				</ScrollView>
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
		alignItems: 'center'
	}
});
