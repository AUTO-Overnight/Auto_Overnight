export default function makeBusTime(
	hour: number,
	minute: number,
	goSchool: boolean
) {
	console.log(hour, minute, goSchool);
	const station = {
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
	const school = {
		8: [100],
		9: [100],
		10: [90, 30, 40, 55],
		11: [5, 15, 30, 40, 55],
		12: [5, 15, 30, 40, 55],
		13: [5, 15, 30, 40, 55],
		14: [5, 15, 30, 40, 55],
		15: [5, 15, 30, 40, 55],
		16: [5, 15, 30, 40, 55],
		17: [200],
		18: [200],
		19: [200],
		20: [200],
		21: [200],
		22: [200],
	};
	let returnText = '';
	let min = 0;
	let busArray = [];
	let h = 0;
	if (goSchool) {
		if (school[hour]) {
			if (school[hour][0] === 100) {
				returnText = '수시 운행 중';
			} else if (school[hour][0] === 90) {
				if (school[hour][1] < minute + 10) {
					for (let i = school[hour].length; i > 0; i--) {
						if (school[hour][i] - minute <= 0) break;
						else {
							min = school[hour][i] - minute;
						}
					}
					busArray = school[hour];
					if (!min) {
						min = school[hour + 1][0] + (60 - minute);
						busArray = school[hour + 1];
						h = hour + 1;
					}

					returnText = `${min}분 남았습니다`;
				} else {
					returnText = '수시 운행 중';
				}
			} else if (school[hour][0] === 200) {
				// 17시 이후 운행 법
				for (let i = station[hour].length; i > 0; i--) {
					if (station[hour][i] - minute <= 0) break;
					else {
						min = i;
					}
				}
				if (station[hour][min - 1] === 90) {
					returnText = `17시 이후 시간 \n 파리바게트 건너편에서 탑승 \n 학교에서 수시 운행중`;
				} else if (station[hour][min - 1] === 100) {
					returnText = `17시 이후 시간 \n 파리바게트 건너편에서 탑승 \n 학교에서 수시 운행중`;
				} else {
					busArray = station[hour];
					returnText = `17시 이후 시간 \n 파리바게트 건너편에서 탑승 \n 학교에서 ${
						station[hour][min - 1]
					}분 출발`;
					if (!min) {
						min = school[hour + 1][0] + (60 - minute);
						busArray = school[hour + 1];
						h = hour + 1;
					}
				}
			} else {
				for (let i = school[hour].length; i > 0; i--) {
					if (school[hour][i] - minute <= 0) break;
					else {
						min = school[hour][i] - minute;
					}
				}
				if (!min) {
					busArray = school[hour + 1];
					h = hour + 1;
					min = school[hour + 1][0] + (60 - minute);
				}
				busArray = school[hour];
				returnText = `${min}분 남았습니다`;
			}
		} else {
			returnText = '운행 중인 셔틀이 없습니다';
		}
	} else {
		if (station[hour]) {
			if (station[hour][0] === 100) {
				returnText = '수시 운행 중';
			} else if (station[hour][0] === 90) {
				if (station[hour][1] < minute + 10) {
					for (let i = station[hour].length; i > 0; i--) {
						if (station[hour][i] - minute <= 0) break;
						else {
							min = station[hour][i] - minute;
						}
					}
					if (!min) {
						busArray = station[hour + 1];
						min = station[hour + 1][0] + (60 - minute);
					}
					busArray = station[hour];
					returnText = `${min}분 남았습니다`;
				} else {
					returnText = '수시 운행 중';
				}
			} else {
				for (let i = station[hour].length; i > 0; i--) {
					if (station[hour][i] - minute <= 0) break;
					else {
						min = station[hour][i] - minute;
					}
				}
				if (!min) {
					busArray = station[hour + 1];
					h = hour + 1;
					min = station[hour + 1][0] + (60 - minute);
				}
				busArray = station[hour];
				returnText = `${min}분 남았습니다`;
			}
		} else {
			returnText = '운행 중인 셔틀이 없습니다';
		}
	}
	if (busArray.length) {
		if (!h) h = hour;
		return { returnText, busArray, h };
	} else {
		return { returnText };
	}
}
