import {Component, Template, Foreach} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {WeatherService} from 'components/weather-service/weather-service';

@Component({
    selector: 'weather-filters'
})
@Template({
    url: 'components/weather-filters/weather-filters.html',
    directives: [Foreach]
})
export class WeatherFilters {

    weatherService: WeatherService;

    constructor(@Inject(WeatherService) weatherService: WeatherService) {
        this.weatherService = weatherService;
    }

    setMaxTemperature($event): void {
        var target = $event.target;
        var maxTemperature = parseInt(target.value);
        this.weatherService.maxTemperature = maxTemperature;
    }

    setMinTemperature($event): void {
        var target = $event.target;
        var minTemperature = parseInt(target.value);
        this.weatherService.minTemperature = minTemperature;
    }
}
