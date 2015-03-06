import {Component, Template, Foreach} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {WeatherService} from 'components/weather-service/weather-service';
import {Day} from 'components/day/day';

@Component({
    selector: 'weather-forecast'
})
@Template({
    url: 'components/weather-forecast/weather-forecast.html',
    directives: [Foreach]
})
export class WeatherForecast {

    weatherService: WeatherService;

    constructor(@Inject(WeatherService) weatherService: WeatherService) {
        this.weatherService = weatherService;
    }

    getDailyForecasts(): Array<Day> {
        return this.weatherService.getDailyWeatherForecast();
    }

}
