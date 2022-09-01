import includes from 'lodash/includes';
import XDate from 'xdate';
import React, { Fragment, useCallback, useMemo, forwardRef, useImperativeHandle, useRef } from 'react';
import { ActivityIndicator, Platform, View, Text, TouchableOpacity, Image } from 'react-native';
import { formatNumbers, weekDayNames } from '../../dateutils';
import { CHANGE_MONTH_LEFT_ARROW, CHANGE_MONTH_RIGHT_ARROW, HEADER_DAY_NAMES, HEADER_LOADING_INDICATOR, HEADER_MONTH_NAME
// @ts-expect-error
 } from '../../testIDs';
import styleConstructor from './style';
const arrowHitSlop = { left: 20, right: 20, top: 20, bottom: 20 };
const accessibilityActions = [
    { name: 'increment', label: 'increment' },
    { name: 'decrement', label: 'decrement' }
];
const CalendarHeader = forwardRef((props, ref) => {
    const { theme, style: propsStyle, addMonth: propsAddMonth, month, monthFormat, firstDay, hideDayNames, showWeekNumbers, hideArrows, renderArrow, onPressArrowLeft, onPressArrowRight, disableArrowLeft, disableArrowRight, disabledDaysIndexes, displayLoadingIndicator, customHeaderTitle, renderHeader, webAriaLevel, testID, accessibilityElementsHidden, importantForAccessibility, numberOfDays, current = '', timelineLeftInset } = props;
    const numberOfDaysCondition = useMemo(() => {
        return numberOfDays && numberOfDays > 1;
    }, [numberOfDays]);
    const style = useRef(styleConstructor(theme));
    const headerStyle = useMemo(() => {
        return [style.current.header, numberOfDaysCondition ? style.current.partialHeader : undefined];
    }, [numberOfDaysCondition]);
    const partialWeekStyle = useMemo(() => {
        return [style.current.partialWeek, { paddingLeft: timelineLeftInset }];
    }, [timelineLeftInset]);
    const dayNamesStyle = useMemo(() => {
        return [style.current.week, numberOfDaysCondition ? partialWeekStyle : undefined];
    }, [numberOfDaysCondition, partialWeekStyle]);
    useImperativeHandle(ref, () => ({
        onPressLeft,
        onPressRight
    }));
    const addMonth = useCallback(() => {
        propsAddMonth?.(1);
    }, [propsAddMonth]);
    const subtractMonth = useCallback(() => {
        propsAddMonth?.(-1);
    }, [propsAddMonth]);
    const onPressLeft = useCallback(() => {
        if (typeof onPressArrowLeft === 'function') {
            return onPressArrowLeft(subtractMonth, month);
        }
        return subtractMonth();
    }, [onPressArrowLeft, subtractMonth, month]);
    const onPressRight = useCallback(() => {
        if (typeof onPressArrowRight === 'function') {
            return onPressArrowRight(addMonth, month);
        }
        return addMonth();
    }, [onPressArrowRight, addMonth, month]);
    const onAccessibilityAction = useCallback((event) => {
        switch (event.nativeEvent.actionName) {
            case 'decrement':
                onPressLeft();
                break;
            case 'increment':
                onPressRight();
                break;
            default:
                break;
        }
    }, [onPressLeft, onPressRight]);
    const renderWeekDays = useMemo(() => {
        const dayOfTheWeek = new XDate(current).getDay();
        const weekDaysNames = numberOfDaysCondition ? weekDayNames(dayOfTheWeek) : weekDayNames(firstDay);
        const dayNames = numberOfDaysCondition ? weekDaysNames.slice(0, numberOfDays) : weekDaysNames;
        return dayNames.map((day, index) => {
            const dayStyle = [style.current.dayHeader];
            if (includes(disabledDaysIndexes, index)) {
                dayStyle.push(style.current.disabledDayHeader);
            }
            const dayTextAtIndex = `dayTextAtIndex${index}`;
            // @ts-expect-error
            if (index === 0) {
                // @ts-expect-error
                dayStyle.push(style.current.dayHeaderSun);
            }
            if (index === 6) {
                // @ts-expect-error
                dayStyle.push(style.current.dayHeaderSat);
            }
            return (<Text allowFontScaling={false} key={index} style={dayStyle} numberOfLines={1} accessibilityLabel={''}>
          {day}
        </Text>);
        });
    }, [firstDay, current, numberOfDaysCondition, numberOfDays, disabledDaysIndexes]);
    const _renderHeader = () => {
        const webProps = Platform.OS === 'web' ? { 'aria-level': webAriaLevel } : {};
        if (renderHeader) {
            return renderHeader(month);
        }
        if (customHeaderTitle) {
            return customHeaderTitle;
        }
        return (<Fragment>
        <Text allowFontScaling={false} style={style.current.monthText} testID={testID ? `${HEADER_MONTH_NAME}-${testID}` : HEADER_MONTH_NAME} {...webProps}>
          {formatNumbers(month?.toString(monthFormat))}
        </Text>
      </Fragment>);
    };
    const _renderArrow = (direction) => {
        if (hideArrows) {
            return <View />;
        }
        const isLeft = direction === 'left';
        const id = isLeft ? CHANGE_MONTH_LEFT_ARROW : CHANGE_MONTH_RIGHT_ARROW;
        const testId = testID ? `${id}-${testID}` : id;
        const shouldDisable = isLeft ? disableArrowLeft : disableArrowRight;
        const onPress = !shouldDisable ? isLeft ? onPressLeft : onPressRight : undefined;
        const imageSource = isLeft ? require('../img/previous.png') : require('../img/next.png');
        const renderArrowDirection = isLeft ? 'left' : 'right';
        return (<TouchableOpacity onPress={onPress} disabled={shouldDisable} style={style.current.arrow} hitSlop={arrowHitSlop} testID={testId}>
        {renderArrow ? (renderArrow(renderArrowDirection)) : (<Image source={imageSource} style={shouldDisable ? style.current.disabledArrowImage : style.current.arrowImage}/>)}
      </TouchableOpacity>);
    };
    const renderIndicator = () => {
        if (displayLoadingIndicator) {
            return (<ActivityIndicator color={theme?.indicatorColor} testID={testID ? `${HEADER_LOADING_INDICATOR}-${testID}` : HEADER_LOADING_INDICATOR}/>);
        }
    };
    const renderWeekNumbersSpace = () => {
        return showWeekNumbers && <View style={style.current.dayHeader}/>;
    };
    const renderDayNames = () => {
        if (!hideDayNames) {
            return (<View style={dayNamesStyle} testID={testID ? `${HEADER_DAY_NAMES}-${testID}` : HEADER_DAY_NAMES}>
          {renderWeekNumbersSpace()}
          {renderWeekDays}
        </View>);
        }
    };
    return (<View testID={testID} style={propsStyle} accessible accessibilityRole={'adjustable'} accessibilityActions={accessibilityActions} onAccessibilityAction={onAccessibilityAction} accessibilityElementsHidden={accessibilityElementsHidden} // iOS
     importantForAccessibility={importantForAccessibility} // Android
    >
      <View style={headerStyle}>
        {_renderArrow('left')}
        <View style={style.current.headerContainer}>
          {_renderHeader()}
          {renderIndicator()}
        </View>
        {_renderArrow('right')}
      </View>
      {renderDayNames()}
    </View>);
});
export default CalendarHeader;
CalendarHeader.displayName = 'CalendarHeader';
CalendarHeader.defaultProps = {
    monthFormat: 'MMMM yyyy',
    webAriaLevel: 1
};
