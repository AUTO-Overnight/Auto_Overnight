export interface weather {
	pm10Value: number; // 미세먼지 pm10 농도
	pm10Grade: number; //
	pm25Value: number; // 초 미세먼지 농도
	pm25Grade: number;
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
	pm10Value: number; // 미세먼지 pm10 농도
	pm10Grade: number; //
	pm25Value: number; // 초 미세먼지 농도
	pm25Grade: number;
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
