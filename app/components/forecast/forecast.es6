import {Day} from 'components/day/day';
import _ from 'lodash';

export class Forecast {

    days: Array<Day>;
    temperatureMax: number;
    temperatureMin: number;

    constructor(forecasts) {
        var days = [];
        var coldestDay = null;
        var hotestDay = null;

        _.each(forecasts, function(forecast) {
            days.push(new Day(forecast));
        });

        coldestDay = _.min(days, function(day) {
            return day.temperatureMin;
        }) || {};

        hotestDay = _.max(days, function(day) {
            return day.temperatureMax;
        }) || {};

        this.days = days;
        this.temperatureMin = coldestDay.temperatureMin || 0;
        this.temperatureMax = hotestDay.temperatureMax || 100;
    }
}
