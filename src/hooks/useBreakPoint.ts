import { useScreenDimensions } from './useScreenDimensions';

export const Breakpoint = {
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE: 'large',
};

export function useBreakpoint() {
	const { width } = useScreenDimensions();
	if (width < 500) {
		return Breakpoint.SMALL;
	} else if (width >= 500 && width < 1000) {
		return Breakpoint.MEDIUM;
	} else {
		return Breakpoint.LARGE;
	}
}
