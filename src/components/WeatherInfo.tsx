import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from 'react-native-paper';
import { useGetHeight, useWeatherOptions } from '../hooks';
import { FontistoIcon, MaterialCommunityIcon } from '../theme';
import { Text, View } from 'react-native';
// import { View } from '../theme/paper';
import { LinearGradient } from 'expo-linear-gradient';
import dayjs from 'dayjs';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useLayout } from '../hooks';
const fontSize = 15;

const windowHeight = useGetHeight();
const windowHeight2 = Dimensions.get('window').height;
const airPollutionHeight = 35;
console.log(windowHeight2);
const iconSize = 30;

interface props {
	current: any;
	daily: any;
	hourly: any;
	isDark: boolean;
	layout: any;
	pm10Value: number;
	pm10Grade: number;
	pm25Value: number;
	pm25Grade: number;
	pm10: any;
	pm25: any;
}

export function WeatherInfo({
	current,
	daily,
	hourly,
	isDark,
	layout,
	pm10Grade,
	pm10Value,
	pm25Grade,
	pm25Value,
	pm10,
	pm25,
}: props) {
	const icons = useWeatherOptions();
	const [gradientColor, setGradientColor] = useState([]);
	const tabBarHeight = useBottomTabBarHeight();
	const [layout2, setLayout] = useLayout();
	console.log('botoom tab bar : ', tabBarHeight);
	useEffect(() => {
		if (current.weather[0].main === 'Clear') {
			if (Number(current.dt) > 5 && Number(current.dt) <= 8) {
				setGradientColor(['#224277', '#B88895']);
			} else if (Number(current.dt) > 9 && Number(current.dt) < 17) {
				setGradientColor(['#4676A2', '#A3C6E7']);
			} else if (Number(current.dt) > 16 && Number(current.dt) < 20) {
				setGradientColor(['#264981', Colors.red100]);
			} else {
				setGradientColor(['#05061B', '#293B59']);
			}
		} else {
			if (Number(current.dt) > 9 && Number(current.dt) < 20) {
				setGradientColor(['#64707F', '#54606B']);
			} else {
				setGradientColor(['#05061B', '#293B59']);
			}
		}
	}, [current]);

	return (
		<>
			<LinearGradient
				colors={gradientColor}
				style={[
					styles.GradientView,
					// { height: windowHeight - airPollutionHeight - tabBarHeight - 50 },
				]}
			>
				<View style={{ flex: 0.1 }}></View>
				<Text style={styles.subTitleText}>현재 날씨</Text>

				<View
					style={[
						styles.rowCircle,
						{
							alignSelf: 'center',
							width: '100%',
						},
					]}
				>
					<View style={styles.columnView}>
						{/* <Text style={[styles.touchText]}>{current.dt}</Text> */}
						<View style={styles.colHourView}>
							<MaterialCommunityIcon
								name={
									current.weather[0].main === 'Clear'
										? current.dt > 8 && current.dt < 18
											? icons.weatherOptions[current.weather[0].main].iconName
											: icons.weatherOptions[current.weather[0].main].nightName
										: icons.weatherOptions[current.weather[0].main].iconName
								}
								color={
									current.weather[0].main === 'Clear' &&
									current.dt > 8 &&
									current.dt < 18
										? Colors.yellow300
										: Colors.white
								}
								size={70}
							/>

							<Text style={styles.currentText}>{current.temp}°C</Text>
							<Text style={styles.currentSubTitle}>
								{icons.weatherOptions[current.weather[0].main].subtitle}
							</Text>
						</View>
					</View>
				</View>
				{/* Weather */}
				<View style={styles.flexView}></View>
				<Text style={styles.subTitleText}>시간별</Text>
				<View style={styles.flexView}></View>
				<View
					style={[
						styles.rowCircle,
						{
							alignSelf: 'center',

							width: '100%',
						},
					]}
				>
					<View style={styles.rowView}>
						{hourly.map(
							(d, idx) =>
								idx < 5 && (
									<View key={d.dt} style={styles.columnView}>
										<Text style={[styles.touchText]}>{d.dt}시</Text>
										<View style={styles.colHourView}>
											<MaterialCommunityIcon
												name={
													d.weather[0].main === 'Clear'
														? d.dt > 6 && d.dt < 18
															? icons.weatherOptions[d.weather[0].main].iconName
															: icons.weatherOptions[d.weather[0].main]
																	.nightName
														: icons.weatherOptions[d.weather[0].main].iconName
												}
												color={
													d.weather[0].main === 'Clear' && d.dt > 6 && d.dt < 18
														? Colors.yellow300
														: Colors.white
												}
												size={25}
											/>

											<Text style={styles.tempText}>{d.temp}°C</Text>
										</View>
									</View>
								)
						)}
					</View>
					<View style={styles.rowView}>
						{hourly.map(
							(d, idx) =>
								idx > 4 &&
								idx < 10 && (
									<View key={d.dt} style={styles.columnView}>
										<Text style={[styles.touchText]}>{d.dt}시</Text>
										<View style={styles.colHourView}>
											<MaterialCommunityIcon
												name={
													d.weather[0].main === 'Clear'
														? d.dt > 6 && d.dt < 18
															? icons.weatherOptions[d.weather[0].main].iconName
															: icons.weatherOptions[d.weather[0].main]
																	.nightName
														: icons.weatherOptions[d.weather[0].main].iconName
												}
												color={
													d.weather[0].main === 'Clear' && d.dt > 6 && d.dt < 18
														? Colors.yellow300
														: Colors.white
												}
												size={25}
											/>

											<Text style={styles.tempText}>{d.temp}°C</Text>
										</View>
									</View>
								)
						)}
					</View>
				</View>
				<View style={styles.flexView}></View>
				<Text style={styles.subTitleText}>요일별</Text>
				<View style={styles.flexView}></View>
				<View
					style={[
						styles.rowCircle,
						{
							alignSelf: 'center',
							width: '100%',
						},
					]}
				>
					<View style={styles.rowView}>
						{daily.map(
							(d, idx) =>
								idx < 3 && (
									<View key={d.dt} style={styles.columnView}>
										<Text style={[styles.touchText]}>{d.dt}</Text>
										<View style={styles.colView}>
											<MaterialCommunityIcon
												name={icons.weatherOptions[d.weather[0].main].iconName}
												color={
													d.weather[0].main === 'Clear'
														? Colors.yellow300
														: Colors.white
												}
												size={iconSize}
											/>

											<Text style={styles.dayTempText}>
												최저 : {d.temp.min}°C
											</Text>
											<Text style={styles.dayTempText}>
												최대 : {d.temp.max}°C
											</Text>
										</View>
									</View>
								)
						)}
					</View>
					<View style={styles.rowView}>
						{daily.map(
							(d, idx) =>
								idx > 2 && (
									<View key={d.dt} style={styles.columnView}>
										<Text style={[styles.touchText]}>{d.dt}</Text>
										<View style={styles.colView}>
											<MaterialCommunityIcon
												name={icons.weatherOptions[d.weather[0].main].iconName}
												color={
													d.weather[0].main === 'Clear'
														? Colors.yellow300
														: Colors.white
												}
												size={iconSize}
											/>

											<Text style={styles.dayTempText}>
												최저 : {d.temp.min}°C
											</Text>
											<Text style={styles.dayTempText}>
												최대 : {d.temp.max}°C
											</Text>
										</View>
									</View>
								)
						)}
					</View>
				</View>
				<View style={styles.flexView}></View>
				{/* <Text style={styles.lastSubTitleText}>미세먼지</Text> */}

				{/* <View style={{ flex: 1 }}></View>
			<View style={{ flex: 1 }}></View> */}
			</LinearGradient>

			<View
				style={[
					styles.airPollutionView,
					{
						width: '100%',
						flexDirection: 'row',
						backgroundColor: pm10.backgroundColor,
					},
				]}
				onLayout={setLayout}
			>
				{console.log('미세먼지 칸 크기', layout2.height)}
				<View style={styles.flexAirView}>
					<Text style={[styles.touchText, { justifyContent: 'center' }]}>
						미세먼지{'    '} :
					</Text>
				</View>
				<View style={styles.flexAir2View}>
					<Text style={[styles.touchText]}>{pm10.text}</Text>
				</View>
				<View style={styles.flexAir2View}>
					<FontistoIcon
						name={icons.icons.pm10Icon}
						color={Colors.white}
						size={23}
					/>
				</View>
				<View style={styles.flexAirView}>
					<Text style={[styles.touchText]}>{pm10Value}㎍/㎥</Text>
				</View>
			</View>

			<View
				style={[
					styles.airPollutionView,
					{
						width: '100%',
						flexDirection: 'row',
						backgroundColor: pm25.backgroundColor,
					},
				]}
			>
				<View style={styles.flexAirView}>
					<Text style={[styles.touchText, { justifyContent: 'center' }]}>
						초미세먼지{'  '} :
					</Text>
				</View>
				<View style={styles.flexAir2View}>
					<Text style={[styles.touchText]}>{pm25.text}</Text>
				</View>
				<View style={styles.flexAir2View}>
					<FontistoIcon
						name={icons.icons.pm25Icon}
						color={Colors.white}
						size={23}
					/>
				</View>
				<View style={styles.flexAirView}>
					<Text style={[styles.touchText]}>{pm25Value}㎍/㎥</Text>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	GradientView: {
		height: windowHeight - 35 - 79 - 50 - 1,
	},
	view: { flex: 1, padding: 0 },
	flexView: {
		flex: 0.07,
	},
	rowView: {
		flexDirection: 'row',
		flex: 1,
	},
	airPollutionView: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		height: airPollutionHeight,
	},

	rowCircle: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: 'transparent',
		flex: 2,
	},
	columnView: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
		flex: 1,
	},
	touchText: {
		fontSize: fontSize - 2,
		color: Colors.white,
		textAlign: 'center',
		fontFamily: 'NanumSquareR',
	},
	colView: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
	colHourView: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
	currentText: {
		fontSize: 18,
		color: Colors.white,
		fontFamily: 'NanumSquareR',
	},
	currentSubTitle: {
		fontSize: 15,
		color: Colors.white,
		fontFamily: 'NanumSquareR',
	},
	tempText: {
		fontSize: 13,
		paddingTop: 2,
		paddingLeft: 0,
		color: Colors.white,
		fontFamily: 'NanumSquareR',
	},
	dayTempText: {
		fontSize: 11,
		paddingTop: 2,
		paddingLeft: 0,
		color: Colors.white,
		fontFamily: 'NanumSquareR',
	},
	subTitleText: {
		fontSize: 18,
		paddingLeft: 20,
		color: Colors.white,
		fontFamily: 'NanumSquareR',
		// marginBottom: 10,
		// paddingTop: 30,
	},
	lastSubTitleText: {
		fontSize: 18,
		paddingLeft: 20,
		color: Colors.white,
		marginBottom: 15,
	},
	flexAirView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	flexAir2View: {
		flex: 0.5,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
