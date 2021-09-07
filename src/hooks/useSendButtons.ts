import React, { useState } from 'react';
import type { Button } from '../interface/buttons';
export function useSendButtons(): { buttonList: Array<Button> } {
	const [buttonList] = useState<Array<Button>>([
		{
			key: 1,
			iconName: 'lock-outline',
			text: '1일 선택',
			color: 'white',
		},
		{
			key: 2,
			iconName: 'lock-outline',
			text: '1주 선택',
			color: 'white',
		},
		{
			key: 3,
			iconName: 'lock-outline',
			text: '2주 선택',
			color: 'white',
		},
		{
			key: 4,
			iconName: 'lock-outline',
			text: '4주 선택',
			color: 'white',
		},
	]);
	return { buttonList };
}
