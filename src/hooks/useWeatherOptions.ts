import { useSelector } from 'react-redux';
import { RootState } from '../store';

const AirPollutionOptions = {
	1: {
		iconName: 'smiling',
	},
	2: {
		iconName: 'neutral',
	},
	3: {
		iconName: 'expressionless',
	},
	4: {
		iconName: 'frowning',
	},
};

const weatherOptions = {
	Haze: {
		iconName: 'weather-hail',
		gradient: ['#4DA0B0', '#D39D38'],
		title: '대체로 흐림',
		subtitle: '흐린 날씨 입니다. 비가 올 수도 있어요.',
	},
	Thunderstorm: {
		iconName: 'weather-lightning',
		gradient: ['#373B44', '#4286f4'],
		title: '번개',
		subtitle: '천둥 번개가 칩니다. 조심하세요!!!',
	},
	Drizzle: {
		iconName: 'weather-hail',
		gradient: ['#89F7FE', '#66A6FF'],
		title: '이슬비 내림',
		subtitle: '이슬비가 내립니다. 우산을 챙기세요!!!',
	},
	Rain: {
		iconName: 'weather-rainy',
		gradient: ['#00C6FB', '#005BEA'],
		title: '비오는 날',
		subtitle: '비가 내립니다. 우산을 챙기세요!!!',
	},
	Snow: {
		iconName: 'weather-snowy-heavy',
		gradient: ['#7DEFC', ' #B9B6E5'],
		title: '눈',
		subtitle: '눈이 내려요. 미끄러지지 않게 조심하세요!!!',
	},
	Clouds: {
		iconName: 'weather-cloudy',
		gradient: ['#D7D2CC', '#304352'],
		title: '대체로 흐림',
		subtitle: '선선한 날씨 입니다.',
	},
	atmosphere: {
		iconName: 'weather-hail',
		gradient: ['#4DA0B0', '#D39D38'],
		title: '안개 낌',
		subtitle: '운전 시 유의하세요',
	},
	Clear: {
		iconName: 'weather-sunny',
		gradient: ['#FF7300', '#FEF253'],
		title: '아주 맑음',
		subtitle: '소풍 가기 좋은 날이에요',
	},
	Dust: {
		iconName: 'weather-hail',
		gradient: ['#4DA0B0', '#D39D38'],
		title: '먼지 낌',
		subtitle: '운전 시 유의하세요!',
	},
	Mist: {
		iconName: 'weather-hail',
		gradient: ['#4DA0B0', '#D39D38'],
		title: '안개 낌',
		subtitle: '운전 시 유의하세요!',
	},
};

export function useWeatherOptions(): {
	icons: {
		AirPollution: string;
	};
	weatherOptions: any;
} {
	const { pm10Grade } = useSelector(({ weather }: RootState) => ({
		pm10Grade: weather.pm10Grade,
	}));
	const icons = {
		AirPollution: AirPollutionOptions[pm10Grade].iconName,
	};
	return { icons, weatherOptions };
}
