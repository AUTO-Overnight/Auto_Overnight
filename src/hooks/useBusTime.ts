export function useBusTime(hour: number, minute: number, go: boolean) {
	const school = {
		8: [100],
		9: [100],
		10: [5, 20, 30, 45, 55],
		11: [5, 20, 30, 45, 55],
		12: [5, 20, 30, 45, 55],
		13: [5, 20, 30, 45, 55],
		14: [5, 20, 30, 45, 55],
		15: [5, 20, 30, 45, 55],
		16: [5, 20, 30, 45, 55],
		17: [100],
		18: [90, 45, 55],
		19: [10, 20, 30, 45],
		20: [10, 30, 50],
		21: [10, 30, 50],
		22: [5, 40],
	};
	const station = {
		8: [100],
		9: [100],
		10: [30, 45, 55],
		11: [5, 20, 30, 45, 55],
		12: [5, 20, 30, 45, 55],
		13: [5, 20, 30, 45, 55],
		14: [5, 20, 30, 45, 55],
		15: [5, 20, 30, 45, 55],
		16: [5, 20, 30, 45, 55],
		17: [200],
		18: [200],
		19: [200],
		20: [200],
		21: [200],
		22: [200],
	};
	let returnText = '';
	let min = 0;
	let min2 = 0;
	if (go) {
		if (school[hour]) {
			if (school[hour][0] === 100) {
				returnText = '상시 운행 중';
			} else if (school[hour][0] === 90) {
				if (school[hour][1] < minute + 10) {
					for (let i = school[hour].length; i > 0; i--) {
						if (school[hour][i] - minute < 0) break;
						else {
							min = school[hour][i] - minute;
						}
					}
					returnText = `${min}분 남았습니다`;
				} else {
					returnText = '상시 운행 중';
				}
			} else {
				for (let i = school[hour].length; i > 0; i--) {
					if (school[hour][i] - minute < 0) break;
					else {
						min = school[hour][i] - minute;
					}
				}
				returnText = `${min}분 남았습니다`;
			}
		}
	} else {
		if (station[hour]) {
			if (station[hour][0] === 100) {
				returnText = '상시 운행 중';
			} else if (station[hour][0] === 90) {
				if (station[hour][1] < minute + 10) {
					for (let i = station[hour].length; i > 0; i--) {
						if (station[hour][i] - minute < 0) break;
						else {
							min = station[hour][i] - minute;
						}
					}
					returnText = `${min}분 남았습니다`;
				} else {
					returnText = '상시 운행 중';
				}
			} else if (station[hour][0] === 200) {
				for (let i = school[hour].length; i > 0; i--) {
					if (school[hour][i] - minute < 0) break;
					else {
						min = i;
					}
				}
				returnText = `17시 이후 시간 \n 파리바게트 건너편에서 탑승 \n ${
					school[hour][min - 1]
				}분 전 출발`;
			} else {
				for (let i = station[hour].length; i > 0; i--) {
					if (station[hour][i] - minute < 0) break;
					else {
						min = station[hour][i] - minute;
					}
				}
				returnText = `${min}분 남았습니다`;
			}
		}
	}
	return returnText;
}
