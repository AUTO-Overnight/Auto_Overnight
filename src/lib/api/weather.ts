import axios from 'axios';
import { WEATHER_TOKEN, WEATHER_KEY } from '@env';
export const getAirPollution = () => {
	return axios.get(
		`http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${WEATHER_TOKEN}&returnType=json&numOfRows=1&pageNo=1&stationName=%EC%A0%95%EC%99%95%EB%8F%99&dataTerm=DAILY&ver=1.0`
	);
};

export const getWeather = () => {
	return axios.get(
		`https://api.openweathermap.org/data/2.5/onecall?lat=37.340170&lon=126.733540&exclude=minutely&appid=${WEATHER_KEY}&lang=en`
	);
};
