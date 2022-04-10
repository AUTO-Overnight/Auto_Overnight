import axios from 'axios';
import { WEATHER_TOKEN, WEATHER_KEY } from '@env';

console.log(WEATHER_KEY, WEATHER_TOKEN);
export const getAirPollution = () => {
	return axios.get(
		`http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${WEATHER_TOKEN}&returnType=json&numOfRows=1&pageNo=1&stationName=%EC%A0%95%EC%99%95%EB%8F%99&dataTerm=DAILY&ver=1.0`
	);
};

export const getWeather = () => {
	return axios.get(
		`https://api.openweathermap.org/data/2.5/onecall?lat=37.339496586083&lon=126.73287520461&exclude=minutely&appid=${WEATHER_KEY}&lang=en`
	);
};
