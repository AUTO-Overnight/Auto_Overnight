export interface weather {
	pm10Value: string; // 미세먼지 pm10 농도
	pm10Grade: string; //
	pm25Value: string; // 초 미세먼지 농도
	pm25Grade: string;
	current: weatherHourly;
	hourly: weatherHourly[];
	daily: weatherForecast[];
	pm10: {
		backgroundColor: string;
		text: string;
	};
	pm25: {
		backgroundColor: string;
		text: string;
	};
	windowHeight: number;
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
	pm10Value: string; // 미세먼지 pm10 농도
	pm10Grade: string; //
	pm25Value: string; // 초 미세먼지 농도
	pm25Grade: string;
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
