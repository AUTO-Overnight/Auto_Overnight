import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import { useWeatherOptions } from '../hooks';
import { FontistoIcon, MaterialCommunityIcon } from '../theme';
import { Text, View } from 'react-native';
// import { View } from '../theme/paper';
import { LinearGradient } from 'expo-linear-gradient';
const fontSize = 15;

interface props {
	current: any;
	daily: any;
	hourly: any;
	isDark: boolean;
}

export function Weather({ current, daily, hourly, isDark }: props) {
	const icons = useWeatherOptions();
	return (
		<LinearGradient colors={['#121B25', '#2C3341']} style={{ padding: 0 }}>
			{/* Weather */}
			<Text style={styles.subTitleText}>시간별</Text>
			<View
				style={[
					styles.rowCircle,
					{
						alignSelf: 'center',
						// backgroundColor: isDark ? Colors.black : Colors.white,
						width: '100%',

						// height: 70,
						// borderRadius: 10,
						// marginTop: 5,
						// marginBottom: 5,
					},
				]}
			>
				<View style={{ flexDirection: 'row' }}>
					{hourly.map(
						(d, idx) =>
							idx < 5 && (
								<View key={d.dt} style={styles.columnView}>
									<Text style={[styles.touchText]}>{d.dt}시</Text>
									<View style={styles.colHourView}>
										<MaterialCommunityIcon
											name={
												d.weather[0].main === 'Clear' && d.dt > 9 && d.dt < 18
													? icons.weatherOptions[d.weather[0].main].iconName
													: icons.weatherOptions[d.weather[0].main].nightName
											}
											color={icons.weatherOptions[d.weather[0].main].iconColor}
											size={25}
										/>

										<Text style={styles.tempText}>{d.temp}°C</Text>
									</View>
								</View>
							)
					)}
				</View>
				<View style={{ flexDirection: 'row' }}>
					{hourly.map(
						(d, idx) =>
							idx > 4 &&
							idx < 10 && (
								<View key={d.dt} style={styles.columnView}>
									<Text style={[styles.touchText]}>{d.dt}시</Text>
									<View style={styles.colHourView}>
										<MaterialCommunityIcon
											name={
												d.weather[0].main === 'Clear' && d.dt > 9 && d.dt < 18
													? icons.weatherOptions[d.weather[0].main].iconName
													: icons.weatherOptions[d.weather[0].main].nightName
											}
											color={icons.weatherOptions[d.weather[0].main].iconColor}
											size={25}
										/>

										<Text style={styles.tempText}>{d.temp}°C</Text>
									</View>
								</View>
							)
					)}
				</View>
			</View>
			<Text style={styles.subTitleText}>요일별</Text>
			<View
				style={[
					styles.rowCircle,
					{
						alignSelf: 'center',
						// backgroundColor: isDark ? Colors.black : Colors.white,
						width: '100%',
						// height: 70,
						// borderRadius: 10,
						// marginTop: 5,
						// marginBottom: 5,
					},
				]}
			>
				<View style={{ flexDirection: 'row' }}>
					{daily.map(
						(d, idx) =>
							idx < 3 && (
								<View key={d.dt} style={styles.columnView}>
									<Text style={[styles.touchText]}>{d.dt}</Text>
									<View style={styles.colView}>
										<MaterialCommunityIcon
											name={icons.weatherOptions[d.weather[0].main].iconName}
											color={icons.weatherOptions[d.weather[0].main].iconColor}
											size={30}
										/>

										<Text style={styles.tempText}>{d.temp.day}°C</Text>
									</View>
								</View>
							)
					)}
				</View>
				<View style={{ flexDirection: 'row' }}>
					{daily.map(
						(d, idx) =>
							idx > 2 && (
								<View key={d.dt} style={styles.columnView}>
									<Text style={[styles.touchText]}>{d.dt}</Text>
									<View style={styles.colView}>
										<MaterialCommunityIcon
											name={icons.weatherOptions[d.weather[0].main].iconName}
											color={icons.weatherOptions[d.weather[0].main].iconColor}
											size={30}
										/>

										<Text style={styles.tempText}>{d.temp.day}°C</Text>
									</View>
								</View>
							)
					)}
				</View>
			</View>
			<Text style={styles.subTitleText}>미세먼지</Text>
			<View
				style={[
					styles.rowCircle,
					{
						// alignSelf: 'flex-start',
						width: '100%',
						flexDirection: 'row',
						marginBottom: 10,
					},
				]}
			>
				<Text style={[styles.touchText, { marginLeft: 8 }]}>
					미세먼지 {'   '}:
				</Text>
				<Text style={[styles.touchText]}>좋음</Text>
				<FontistoIcon
					name={icons.icons.AirPollution}
					color={Colors.white}
					size={20}
				></FontistoIcon>
				<Text style={[styles.touchText]}>30Pm</Text>
			</View>
			<View
				style={[
					styles.rowCircle,
					{
						// alignSelf: 'flex-start',
						width: '100%',
						flexDirection: 'row',
						marginBottom: 10,
					},
				]}
			>
				<Text style={[styles.touchText, { marginLeft: 14 }]}>초미세먼지 :</Text>
				<Text style={[styles.touchText]}>매우나쁨</Text>
				<FontistoIcon
					name={icons.icons.AirPollution}
					color={Colors.white}
					size={20}
				></FontistoIcon>
				<Text style={[styles.touchText]}>30Pm</Text>
			</View>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	view: { flex: 1, padding: 0 },
	rowCircle: {
		flexDirection: 'column',
		// padding: 15,
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: 'transparent',
	},
	columnView: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 5,
		paddingRight: 5,
		backgroundColor: 'transparent',
	},
	touchText: { fontSize: fontSize, color: Colors.white },
	colView: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		// justifyContent: 'flex-start',
		// paddingTop: 3,
		padding: 21,
		paddingTop: 4,
		paddingBottom: 4,
		backgroundColor: 'transparent',
	},
	colHourView: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: 38,
		backgroundColor: 'transparent',
	},
	tempText: {
		fontSize: 13,
		paddingLeft: 5,
		color: Colors.white,
	},
	subTitleText: {
		fontSize: 20,
		paddingLeft: 30,
		color: Colors.white,
		paddingBottom: 10,
		paddingTop: 10,
	},
});
