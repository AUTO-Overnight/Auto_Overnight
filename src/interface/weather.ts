export interface weather {
	pm10Value: number; // 미세먼지 pm10 농도
	khaiValue: number; //통합대기환경수치
	pm10Grade: number; //
}

export interface AirPollutionAPI {
	response: {
		body: {
			items: [AirPollution];
		};
	};
}

export interface AirPollution {
	pm10Value: number; // 미세먼지 pm10 농도
	khaiValue: number; //통합대기환경수치
	pm10Grade: number; //
}
