import React from 'react';
import type { FC, ReactNode } from 'react';
import { LayoutChangeEvent, StyleSheet } from 'react-native';
import { View, Text } from './navigation';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type NavigationHeaderProps = {
	title?: string;
	Left?: () => ReactNode;
	Right?: () => ReactNode;
	viewStyle?: StyleProp<ViewStyle>;
	titleStyle?: StyleProp<TextStyle>;
	secondRight?: () => ReactNode;
	onLayout?: (event: LayoutChangeEvent) => void;
};

export const NavigationHeader: FC<NavigationHeaderProps> = ({
	title,
	Left,
	Right,
	viewStyle,
	secondRight,
	titleStyle
}) => {
	return (
		<View style={[styles.view, viewStyle]}>
			<View style={styles.halfFlex}>{Left && Left()}</View>

			<View style={styles.flex}>
				<Text style={[styles.title, titleStyle]}>{title}</Text>
			</View>
			<View
				style={[
					styles.halfFlex,
					{ flexDirection: 'row', justifyContent: 'flex-end' }
				]}
			>
				{secondRight && secondRight()}
				<View style={{ flex: 0.3, backgroundColor: 'transparent' }}></View>
				{Right && Right()}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	view: {
		width: '100%',
		padding: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 50
	},
	title: {
		fontSize: 20,
		fontWeight: '500',
		textAlign: 'center',
		fontFamily: 'NanumSquareBold'
	},
	flex: { flex: 0.6, backgroundColor: 'transparent' },
	halfFlex: {
		flex: 0.6,
		backgroundColor: 'transparent'
	}
});
