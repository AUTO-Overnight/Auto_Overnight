import { Breakpoint } from '../hooks';
export function dataViewToScreenSize(
	data: Array<any>,
	breakpoint: string,
	smallBreakpointIndices: Array<any>,
	mediumBreakpointIndices: Array<any>
) {
	switch (breakpoint) {
		case Breakpoint.SMALL:
			return data.filter((_, i) => smallBreakpointIndices.indexOf(i) !== -1);
		case Breakpoint.MEDIUM:
			return data.filter((_, i) => mediumBreakpointIndices.indexOf(i) !== -1);
		default:
			return data;
	}
}

dataViewToScreenSize.defaultProps = {
	breakpoint: Breakpoint,
	data: [],
	mediumBreakpointIndices: [],
	smallBreakpointIndices: [],
};
