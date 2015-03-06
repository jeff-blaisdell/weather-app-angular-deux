import {Forecast} from 'components/forecast/forecast';
import {Day} from 'components/day/day';
import {GeoLocation} from 'components/geo-location/geo-location';
import {WeatherResource} from 'components/weather-resource/weather-resource';
import _ from 'lodash';

export class WeatherService {

    maxTemperature: number;
    minTemperature: number;
    forecast: Forecast;
    geoLocation: GeoLocation;
    weatherResource: WeatherResource;

    constructor(weatherResource: WeatherResource) {
        this.maxTemperature = 100;
        this.minTemperature = -10;
        this.forecast = new Forecast();
        this.weatherResource = weatherResource;
    }

    setWeatherLocation(geoLocation: GeoLocation): void {
        var that = this;
        this.geoLocation = geoLocation;
        this.weatherResource.getWeather(this.geoLocation.latitude, this.geoLocation.longitude).then(
            function(val) {
                that.forecast = val;
                that.maxTemperature = that.forecast.temperatureMax;
                that.minTemperature = that.forecast.temperatureMin;
            }
        )
    }

    getDailyWeatherForecast(): Array<Day> {
        var that = this;
        return _.filter(this.forecast.days, function(day) {
            return day.temperatureMin >= that.minTemperature && day.temperatureMax <= that.maxTemperature;
        });
    }
}
