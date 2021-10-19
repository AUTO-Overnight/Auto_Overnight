export interface weather {
	pm10Value: number; // 미세먼지 pm10 농도
	khaiValue: number; //통합대기환경수치
	pm10Grade: number; //
	current: weatherHourly;
	hourly: weatherHourly[];
	daily: weatherForecast[];
}

export interface AirPollutionAPI {
	response: {
		body: {
			items: [AirPollution];
		};
	};
}

export interface weatherAPI {
	current: weatherHourly;
	hourly: weatherHourly[];
	daily: weatherForecast[];
}

export interface AirPollution {
	pm10Value: number; // 미세먼지 pm10 농도
	khaiValue: number; //통합대기환경수치
	pm10Grade: number; //
}

export interface weatherHourly {
	dt: string | number;
	temp: number;
	weather: {
		main: string;
	};
}

export interface weatherForecast {
	dt: string | number;
	temp: {
		day: number;
		min: number;
		max: number;
	};
	weather: {
		main: string;
	};
}
