import React from 'react';
import { FlatList } from 'react-native';
import { DateData } from '../../types';
import { WeekCalendarProps } from './index';
declare class Presenter {
    private _applyAndroidRtlFix;
    private _firstAndroidRTLScrollIgnored;
    list: React.RefObject<FlatList>;
    scrollToIndex: (animated: boolean) => void;
    onDayPress: (context: any, value: DateData) => void;
    onScroll: ({ context, updateState, x, page, items, width }: any) => void;
    onMomentumScrollEnd: ({ items, props, page, updateItems }: any) => void;
    shouldComponentUpdate: (context: any, prevContext: any) => boolean;
    getDate({ current, context, firstDay }: WeekCalendarProps, weekIndex: number): any;
    getDatesArray: (args: WeekCalendarProps) => any[];
    _shouldUpdateState: (page: number, newPage: number) => boolean;
    _getX: (x: number, itemsCount: number, containerWidth: number) => number;
    _getNewPage: (x: number, containerWidth: number) => number;
    _isFirstPage: (page: number) => boolean;
    _isLastPage: (page: number, items: string[]) => boolean;
    _getNextPageItems: (items: string[]) => string[];
    _getFirstPageItems: (items: string[]) => string[];
    _mergeArraysFromEnd: (items: string[], newArray: string[]) => string[];
    _mergeArraysFromTop: (items: string[], newArray: string[]) => string[];
    _getItemsForPage: (page: number, items: string[]) => string[];
}
export default Presenter;
