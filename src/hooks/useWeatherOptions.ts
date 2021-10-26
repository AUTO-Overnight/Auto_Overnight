import { Colors } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const AirPollutionOptions = {
	1: {
		iconName: 'smiley',
	},
	2: {
		iconName: 'slightly-smile',
	},
	3: {
		iconName: 'confused',
	},
	4: {
		iconName: 'frowning',
	},
};

const weatherOptions = {
	Haze: {
		iconName: 'weather-hail',
		iconColor: Colors.grey500,
		gradient: ['#4DA0B0', '#D39D38'],
		title: '대체로 흐림',
		subtitle: '흐린 날씨 입니다. 비가 올 수도 있어요.',
	},
	Thunderstorm: {
		iconName: 'weather-lightning',
		iconColor: Colors.grey900,
		gradient: ['#373B44', '#4286f4'],
		title: '번개',
		subtitle: '천둥 번개가 칩니다. 조심하세요!!!',
	},
	Drizzle: {
		iconName: 'weather-hail',
		iconColor: Colors.blue200,
		gradient: ['#89F7FE', '#66A6FF'],
		title: '이슬비 내림',
		subtitle: '이슬비가 내립니다. 우산을 챙기세요!!!',
	},
	Rain: {
		iconName: 'weather-rainy',
		iconColor: Colors.blue400,
		gradient: ['#00C6FB', '#005BEA'],
		title: '비오는 날',
		subtitle: '비가 내립니다. 우산을 챙기세요!!!',
	},
	Snow: {
		iconName: 'weather-snowy-heavy',
		iconColor: Colors.white,
		gradient: ['#7DEFC', ' #B9B6E5'],
		title: '눈',
		subtitle: '눈이 내려요. 미끄러지지 않게 조심하세요!!!',
	},
	Clouds: {
		iconName: 'weather-cloudy',
		iconColor: Colors.white,
		//gradient: ['#D7D2CC', '#304352'],
		gradient: ['#304352', '#D7D2CC'],
		title: '대체로 흐림',
		subtitle: '선선한 날 이에요',
	},
	atmosphere: {
		iconName: 'weather-hail',
		iconColor: Colors.white,
		gradient: ['#4DA0B0', '#D39D38'],
		title: '안개 낌',
		subtitle: '우중충한 날이에요',
	},
	Clear: {
		iconName: 'weather-sunny',
		nightName: 'weather-night',
		iconColor: [Colors.yellow400, Colors.white],
		//gradient: ['#FF7300', Colors.grey100],
		gradient: [Colors.yellow400, Colors.orange900],
		blackGradient: [Colors.black, Colors.grey500],
		title: '아주 맑음',
		subtitle: '여행 가기 좋은 날이에요',
	},
	Dust: {
		iconName: 'weather-hail',
		iconColor: Colors.white,
		gradient: ['#4DA0B0', '#D39D38'],
		title: '먼지 낌',
		subtitle: '우중충한 날이에요',
	},
	Mist: {
		iconName: 'weather-hail',
		iconColor: Colors.white,
		gradient: ['#4DA0B0', '#D39D38'],
		title: '안개 낌',
		subtitle: '우중충한 날이에요',
	},
};

export function useWeatherOptions(): {
	weatherOptions: any;
} {
	// const { pm10Grade, pm25Grade } = useSelector(({ weather }: RootState) => ({
	// 	pm10Grade: weather.pm10Grade,
	// 	pm25Grade: weather.pm25Grade,
	// }));
	// const icons = {
	// 	pm10Icon: AirPollutionOptions[pm10Grade].iconName,
	// 	pm25Icon: AirPollutionOptions[pm25Grade].iconName,
	// };
	return { weatherOptions };
}
