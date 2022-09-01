import XDate from 'xdate';
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { sameMonth } from '../../dateutils';
import { xdateToData } from '../../interface';
import { useDidUpdate } from '../../hooks';
import { UpdateSources } from '../commons';
import styleConstructor from '../style';
import CalendarContext from './index';
import { shouldAnimateTodayButton, shouldAnimateOpacity, getButtonIcon, getPositionAnimation, getOpacityAnimation, getTodayDate, getTodayFormatted } from './Presenter';
const TOP_POSITION = 65;
/**
 * @description: Calendar context provider component
 * @example: https://github.com/wix/react-native-calendars/blob/master/example/src/screens/expandableCalendar.js
 */
const CalendarProvider = (props) => {
    const { theme, date, onDateChanged, onMonthChange, showTodayButton = false, todayBottomMargin, todayButtonStyle, style: propsStyle, numberOfDays, timelineLeftInset = 72, children } = props;
    const style = useRef(styleConstructor(theme));
    const buttonY = useRef(new Animated.Value(todayBottomMargin ? -todayBottomMargin : -TOP_POSITION));
    const opacity = useRef(new Animated.Value(1));
    const today = useRef(getTodayFormatted());
    const prevDate = useRef(date);
    const currDate = useRef(date); // for setDate only to keep prevDate up to date
    const [currentDate, setCurrentDate] = useState(date);
    const [updateSource, setUpdateSource] = useState(UpdateSources.CALENDAR_INIT);
    const [isDisabled, setIsDisabled] = useState(false);
    const [buttonIcon, setButtonIcon] = useState(getButtonIcon(date, showTodayButton));
    const wrapperStyle = useMemo(() => {
        return [style.current.contextWrapper, propsStyle];
    }, [style, propsStyle]);
    useDidUpdate(() => {
        if (date) {
            _setDate(date, UpdateSources.PROP_UPDATE);
        }
    }, [date]);
    useEffect(() => {
        animateTodayButton(currentDate);
    }, [todayBottomMargin, currentDate]);
    /** Context */
    const _setDate = useCallback((date, updateSource) => {
        prevDate.current = currDate.current;
        currDate.current = date;
        setCurrentDate(date);
        setUpdateSource(updateSource);
        setButtonIcon(getButtonIcon(date, showTodayButton));
        onDateChanged?.(date, updateSource);
        if (!sameMonth(new XDate(date), new XDate(prevDate.current))) {
            onMonthChange?.(xdateToData(new XDate(date)), updateSource);
        }
    }, [onDateChanged, onMonthChange]);
    const _setDisabled = useCallback((disabled) => {
        if (!showTodayButton || disabled === isDisabled) {
            return;
        }
        setIsDisabled(disabled);
        animateOpacity(disabled);
    }, [showTodayButton, isDisabled]);
    const contextValue = useMemo(() => {
        return {
            date: currentDate,
            prevDate: prevDate.current,
            updateSource: updateSource,
            setDate: _setDate,
            setDisabled: _setDisabled,
            numberOfDays,
            timelineLeftInset
        };
    }, [currentDate, updateSource, numberOfDays, _setDisabled]);
    /** Animations */
    const animateTodayButton = (date) => {
        if (shouldAnimateTodayButton(props)) {
            const animationData = getPositionAnimation(date, todayBottomMargin);
            Animated.spring(buttonY.current, {
                ...animationData
            }).start();
        }
    };
    const animateOpacity = (disabled) => {
        if (shouldAnimateOpacity(props)) {
            const animationData = getOpacityAnimation(props, disabled);
            Animated.timing(opacity.current, {
                ...animationData
            }).start();
        }
    };
    /** Events */
    const onTodayPress = useCallback(() => {
        _setDate(getTodayDate(), UpdateSources.TODAY_PRESS);
    }, [_setDate]);
    /** Renders */
    const renderTodayButton = () => {
        return (<Animated.View style={[style.current.todayButtonContainer, { transform: [{ translateY: buttonY.current }] }]}>
        <TouchableOpacity style={[style.current.todayButton, todayButtonStyle]} onPress={onTodayPress} disabled={isDisabled}>
          <Animated.Image style={[style.current.todayButtonImage, { opacity: opacity.current }]} source={buttonIcon}/>
          <Animated.Text allowFontScaling={false} style={[style.current.todayButtonText, { opacity: opacity.current }]}>
            {today.current}
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>);
    };
    return (<CalendarContext.Provider value={contextValue}>
      <View style={wrapperStyle}>{children}</View>
      {showTodayButton && renderTodayButton()}
    </CalendarContext.Provider>);
};
export default CalendarProvider;
CalendarProvider.displayName = 'CalendarProvider';
