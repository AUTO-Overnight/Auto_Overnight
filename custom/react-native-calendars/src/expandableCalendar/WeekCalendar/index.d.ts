import React from 'react';
import { CalendarListProps } from '../../calendar-list';
export interface WeekCalendarProps extends CalendarListProps {
    /** whether to have shadow/elevation for the calendar */
    allowShadow?: boolean;
    context?: any;
}
declare const _default: React.ComponentClass<WeekCalendarProps, any>;
export default _default;
