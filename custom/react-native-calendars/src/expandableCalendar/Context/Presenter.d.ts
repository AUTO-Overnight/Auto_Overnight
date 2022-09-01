import { CalendarContextProviderProps } from './Provider';
/** Today */
export declare const getTodayDate: () => string;
export declare const getTodayFormatted: () => any;
/** Today button's icon */
export declare const _getIconDown: () => any;
export declare const _getIconUp: () => any;
export declare const getButtonIcon: (date: string, showTodayButton?: boolean) => any;
/** Animations */
export declare const shouldAnimateTodayButton: (props: CalendarContextProviderProps) => boolean | undefined;
export declare const getPositionAnimation: (date: string, todayBottomMargin?: number) => {
    toValue: number;
    tension: number;
    friction: number;
    useNativeDriver: boolean;
};
export declare const shouldAnimateOpacity: (props: CalendarContextProviderProps) => number | undefined;
export declare const getOpacityAnimation: ({ disabledOpacity }: CalendarContextProviderProps, disabled: boolean) => {
    toValue: number;
    duration: number;
    useNativeDriver: boolean;
};
