import XDate from 'xdate';
import React from 'react';
import { toMarkingFormat } from '../../interface';
import constants from '../../commons/constants';
import { generateDay } from '../../dateutils';
const commons = require('../commons');
const updateSources = commons.UpdateSources;
// must be a positive number
const NUMBER_OF_PAGES = 2;
class Presenter {
    _applyAndroidRtlFix = constants.isAndroid && constants.isRTL;
    // On Android+RTL there's an initial scroll that cause issues
    _firstAndroidRTLScrollIgnored = !this._applyAndroidRtlFix;
    list = React.createRef();
    scrollToIndex = (animated) => {
        this.list?.current?.scrollToIndex({ animated, index: NUMBER_OF_PAGES });
    };
    // Events
    onDayPress = (context, value) => {
        context.setDate?.(value.dateString, updateSources.DAY_PRESS);
    };
    onScroll = ({ context, updateState, x, page, items, width }) => {
        if (!this._firstAndroidRTLScrollIgnored) {
            this._firstAndroidRTLScrollIgnored = true;
            return;
        }
        x = this._getX(x, items?.length, width);
        const newPage = this._getNewPage(x, width);
        if (this._shouldUpdateState(page, newPage)) {
            context.setDate?.(items[newPage], updateSources.WEEK_SCROLL);
            const data = this._getItemsForPage(newPage, items);
            updateState(data, newPage);
        }
    };
    onMomentumScrollEnd = ({ items, props, page, updateItems }) => {
        if (this._isFirstPage(page) || this._isLastPage(page, items)) {
            this.scrollToIndex(false);
            const newWeekArray = this.getDatesArray(props);
            let updatedItems;
            if (this._isLastPage(page, items)) {
                updatedItems = this._mergeArraysFromEnd(items, newWeekArray);
            }
            else {
                updatedItems = this._mergeArraysFromTop(items, newWeekArray);
            }
            updateItems(updatedItems);
        }
    };
    shouldComponentUpdate = (context, prevContext) => {
        const { date, updateSource, numberOfDays } = context;
        return ((date !== prevContext.date && updateSource !== updateSources.WEEK_SCROLL) ||
            numberOfDays !== prevContext.numberOfDays);
    };
    getDate({ current, context, firstDay = 0 }, weekIndex) {
        const d = new XDate(current || context.date);
        const numberOfDays = context.numberOfDays;
        // get the first day of the week as date (for the on scroll mark)
        let dayOfTheWeek = d.getDay();
        if (dayOfTheWeek < firstDay && firstDay > 0) {
            dayOfTheWeek = 7 + dayOfTheWeek;
        }
        if (numberOfDays > 1) {
            return generateDay(d, weekIndex * numberOfDays);
        }
        else {
            // leave the current date in the visible week as is
            const dd = weekIndex === 0 ? d : d.addDays(firstDay - dayOfTheWeek);
            return toMarkingFormat(dd.addWeeks(weekIndex));
        }
    }
    getDatesArray = (args) => {
        const array = [];
        for (let index = -NUMBER_OF_PAGES; index <= NUMBER_OF_PAGES; index++) {
            const d = this.getDate(args, index);
            array.push(d);
        }
        return array;
    };
    _shouldUpdateState = (page, newPage) => {
        return page !== newPage;
    };
    _getX = (x, itemsCount, containerWidth) => {
        if (this._applyAndroidRtlFix) {
            const numberOfPages = itemsCount - 1;
            const overallWidth = numberOfPages * containerWidth;
            return overallWidth - x;
        }
        return x;
    };
    _getNewPage = (x, containerWidth) => {
        return Math.round(x / containerWidth);
    };
    _isFirstPage = (page) => {
        return page === 0;
    };
    _isLastPage = (page, items) => {
        return page === items.length - 1;
    };
    _getNextPageItems = (items) => {
        return items.map((_, i) => {
            const index = i <= NUMBER_OF_PAGES ? i + NUMBER_OF_PAGES : i;
            return items[index];
        });
    };
    _getFirstPageItems = (items) => {
        return items.map((_, i) => {
            const index = i >= NUMBER_OF_PAGES ? i - NUMBER_OF_PAGES : i;
            return items[index];
        });
    };
    _mergeArraysFromEnd = (items, newArray) => {
        for (let i = NUMBER_OF_PAGES + 1; i < items.length; i++) {
            items[i] = newArray[i];
        }
        return items;
    };
    _mergeArraysFromTop = (items, newArray) => {
        for (let i = 0; i < NUMBER_OF_PAGES; i++) {
            items[i] = newArray[i];
        }
        return items;
    };
    _getItemsForPage = (page, items) => {
        if (this._isLastPage(page, items)) {
            return this._getNextPageItems(items);
        }
        else if (this._isFirstPage(page)) {
            return this._getFirstPageItems(items);
        }
        return items;
    };
}
export default Presenter;
