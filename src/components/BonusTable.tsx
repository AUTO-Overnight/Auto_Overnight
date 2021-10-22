import React, { Fragment, useCallback, useEffect } from 'react';
import { Table, Row } from 'react-native-table-component';
import { StyleSheet } from 'react-native';
import { makeBonusArray, useBreakpoint } from '../hooks';
import { dataViewToScreenSize } from './dataViewToScreenSize';
import { Colors } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getBonus } from '../store/bonus';
import { RootState } from '../store';
import type { BonusAPI } from '../interface';
import { useMemo } from 'react';

const head = ['상/벌 구분', '점수', '일자'];
const list = ['상/벌점', '내역이', '없습니다.'];

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

	let bonusList = useMemo(
		() => makeBonusArray({ ardInptDt, cmpScr, lifSstArdCtnt, lifSstArdGbn }),
		[ardInptDt]
	);
	useEffect(() => {
		if (!ardInptDt.length) {
			bonusList.push(list);
		}
	}, [ardInptDt]);
	useEffect(() => {
		const data: BonusAPI = {
			cookies: cookies,
			id: id,
			name: name,
		};
		dispatch(getBonus(data));
	}, [cookies, id, name]);

	return (
		<Fragment>
			<Table
				borderStyle={{
					borderColor: isDark ? '#171b22' : Colors.blue400,
					// borderTopLeftRadius: 0,
					// borderTopEndRadius: 0,
					// borderTopRightRadius: 0,
					borderRightWidth: 10,
					borderLeftWidth: 10,
					borderBottomWidth: 10,
					borderTopWidth: 10,
					// borderWidth: 1,
				}}
				style={styles.table}
			>
				<Row
					data={dataViewToScreenSize(
						head,
						breakpoint,
						smallScreenIndices,
						mediumScreenIndices
					)}
					style={{
						height: 40,
						backgroundColor: isDark ? '#2b323d' : Colors.blue300,
						borderTopLeftRadius: 5,
						borderTopRightRadius: 5,
					}}
					textStyle={{
						textAlign: 'center',
						color: isDark ? Colors.white : Colors.grey900,
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
						style={[
							styles.dataRow,
							{ backgroundColor: isDark ? '#222831' : Colors.blue100 },
						]}
						textStyle={{
							textAlign: 'center',
							color: isDark ? Colors.white : Colors.grey900,
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
		backgroundColor: '#222831',
		// borderBottomRightRadius: 5,
		// borderBottomLeftRadius: 5,
	},
	dataRow: {
		height: 25,
		borderBottomRightRadius: 5,
		borderBottomLeftRadius: 5,
	},
	border: {},
	table: {
		// marginTop: 20,
		marginBottom: 10,
		width: '90%',
		justifyContent: 'center',
		alignSelf: 'center',
		// borderRadius: 5,
	},
});
