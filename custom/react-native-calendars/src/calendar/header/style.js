import { StyleSheet, Platform } from 'react-native';
import * as defaultStyle from '../../style';
import constants from '../../commons/constants';
import { Colors } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
export default function (theme = {}) {
    const appStyle = { ...defaultStyle, ...theme };
    const rtlStyle = constants.isRTL ? { transform: [{ scaleX: -1 }] } : undefined;
    const isDark = useTheme().dark;
    
    return StyleSheet.create({
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: 6,
            alignItems: 'center',
        },
        partialHeader: {
            paddingHorizontal: 15
        },
        headerContainer: {
            flexDirection: 'row'
        },
        monthText: {
            fontSize: appStyle.textMonthFontSize,
            fontFamily: appStyle.textMonthFontFamily,
            fontWeight: appStyle.textMonthFontWeight,
            color: appStyle.monthTextColor,
            margin: 10
        },
        arrow: {
            padding: 10,
            ...appStyle.arrowStyle
        },
        arrowImage: {
            ...rtlStyle,
            tintColor: appStyle.arrowColor,
            ...Platform.select({
                web: {
                    width: appStyle.arrowWidth,
                    height: appStyle.arrowHeight
                }
            })
        },
        disabledArrowImage: {
            ...rtlStyle,
            tintColor: appStyle.disabledArrowColor
        },
        week: {
            marginTop: 7,
            flexDirection: 'row',
            justifyContent: 'space-around',
            
        },
        partialWeek: {
            paddingRight: 0
        },
        dayHeader: {
            marginTop: 2,
            marginBottom: 7,
            width: 32,
            textAlign: 'center',
            fontSize: appStyle.textDayHeaderFontSize,
            fontFamily: appStyle.textDayHeaderFontFamily,
            fontWeight: appStyle.textDayHeaderFontWeight,
            color: appStyle.textSectionTitleColor
        },
        dayHeaderSun: {
            marginTop: 2,
            marginBottom: 7,
            width: 32,
            textAlign: 'center',
            fontSize: appStyle.textDayHeaderFontSize,
            fontFamily: appStyle.textDayHeaderFontFamily,
            fontWeight: appStyle.textDayHeaderFontWeight,
            color: isDark ? Colors.red200 : Colors.red500,
        },
        dayHeaderSat: {
            marginTop: 2,
            marginBottom: 7,
            width: 32,
            textAlign: 'center',
            fontSize: appStyle.textDayHeaderFontSize,
            fontFamily: appStyle.textDayHeaderFontFamily,
            fontWeight: appStyle.textDayHeaderFontWeight,
            color: isDark ? Colors.blue200 : Colors.blue500,
        },
        disabledDayHeader: {
            color: appStyle.textSectionTitleDisabledColor
        },
        // @ts-expect-error
        ...(theme['stylesheet.calendar.header'] || {})
    });
}
