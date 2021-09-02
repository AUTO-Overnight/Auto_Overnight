import React, { Fragment, useCallback, useEffect } from 'react';
import { Table, Row } from 'react-native-table-component';
import { StyleSheet } from 'react-native';
import { makeBonusArray, useBreakpoint, useGetBonusPoint } from '../hooks';
import { dataViewToScreenSize } from './dataViewToScreenSize';
import { Colors } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getBonus } from '../store/bonus';
import { RootState } from '../store';
import type { BonusAPI } from '../interface';
import { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
// import { dataViewToScreenSize } from './dataToScreenSize';
// import { RotationHint } from './Rotation';
// import { useBreakpoint } from '../Hooks/useBreakpoint';

// Table header items
const head = ['상벌구분', '점수', '일자'];

// Table data rows
// const data = [
// 	['ADBE', '4', '$270.45', '$1,081.80', '$278.25', '$1,113.00'],
// 	['AAPL', '9', '$180.18', '$1,621.62', '$178.35', '$1,605.15'],
// 	['GOOGL', '3', '$1,023.58', '$3,070.74', '$1,119.94', '$3,359.82'],
// ];

export const smallScreenIndices = [0, 1, 2];

// Indices to include on a medium screen
export const mediumScreenIndices = [0, 1, 2, 3, 4, 5];

export const BonusTable = ({ isDark }) => {
	const breakpoint = useBreakpoint();
	const {
		id,
		name,
		cookies,
		loadingBonus,
		ardInptDt,
		cmpScr,
		lifSstArdCtnt,
		lifSstArdGbn,
	} = useSelector(({ login, bonus, loading }: RootState) => ({
		id: login.id,
		name: login.name,
		cookies: login.cookies,
		loadingBonus: loading['bonus/GET_BONUS'],
		ardInptDt: bonus.ardInptDt,
		cmpScr: bonus.cmpScr,
		lifSstArdCtnt: bonus.lifSstArdCtnt,
		lifSstArdGbn: bonus.lifSstArdGbn,
	}));
	const dispatch = useDispatch();

	console.log(isDark);
	const bonusList = useMemo(
		() => makeBonusArray({ ardInptDt, cmpScr, lifSstArdCtnt, lifSstArdGbn }),
		[ardInptDt]
	);
	useEffect(() => {
		const data: BonusAPI = {
			cookies: cookies,
			id: id,
			name: name,
		};
		dispatch(getBonus(data));
	}, [cookies, id, name]);
	console.log(bonusList);

	return (
		<Fragment>
			<Table borderStyle={styles.border} style={styles.table}>
				<Row
					data={dataViewToScreenSize(
						head,
						breakpoint,
						smallScreenIndices,
						mediumScreenIndices
					)}
					style={styles.head}
					textStyle={{
						textAlign: 'center',
						color: isDark ? Colors.white : Colors.white,
						fontSize: 14,
					}}
				/>

				{bonusList.map((entry, index) => (
					<Row
						key={index}
						data={dataViewToScreenSize(
							entry,
							breakpoint,
							smallScreenIndices,
							mediumScreenIndices
						)}
						style={styles.dataRow}
						textStyle={{
							textAlign: 'center',
							color: isDark ? Colors.white : Colors.black,
							fontSize: 14,
						}}
					/>
				))}
			</Table>
			{/* <RotationHint /> */}
		</Fragment>
	);
};

const styles = StyleSheet.create({
	text: {
		textAlign: 'center',
		color: Colors.white,
		fontSize: 14,
	},
	head: {
		height: 35,
		backgroundColor: Colors.red300,
	},
	dataRow: {
		height: 25,
	},
	border: {
		borderWidth: 1,

		borderColor: Colors.red400,
	},
	table: {
		marginTop: 20,
		marginBottom: 10,
	},
});
