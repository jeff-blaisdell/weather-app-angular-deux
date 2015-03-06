import {Component, Template, Foreach, bootstrap} from 'angular2/angular2';
import {WeatherResource} from 'components/weather-resource/weather-resource';
import {WeatherService} from 'components/weather-service/weather-service';
import {WeatherFilters} from 'components/weather-filters/weather-filters';
import {WeatherForecast} from 'components/weather-forecast/weather-forecast';
import {Forecast} from 'components/forecast/forecast';
import {GeoLocation} from 'components/geo-location/geo-location';
import {GeoLocationResource} from 'components/geo-location-resource/geo-location-resource';

@Component({
    selector: 'weather-app',
    componentServices: [
        WeatherService,
        WeatherResource,
        GeoLocationResource
    ]
})
@Template({
    url: 'components/weather-app/weather-app.html',
    directives: [Foreach, WeatherFilters, WeatherForecast]
})
class WeatherApp {
    weather: Forecast;
    weatherService: WeatherService;
    geoLocationResource: GeoLocationResource;
    geoLocation: GeoLocation;

    constructor(weatherService: WeatherService,
                geoLocationResource: GeoLocationResource) {

        var that = this;
        this.siteName = 'Weather Me';
        this.siteText = 'Play outside!';
        this.weatherService = weatherService;
        this.geoLocation = new GeoLocation();
        this.geoLocationResource = geoLocationResource;

        // Default location.
        geoLocationResource.getGeoLocation('15 S 5th St 300, Minneapolis, MN').then(
            function(val) {
                that.geoLocation = val;
                that.weatherService.setWeatherLocation(that.geoLocation);
            }
        );
    }

    lookupLocation($event): void {
        var that = this;
        var target = $event.target;
        var address = target.value;
        this.geoLocationResource.getGeoLocation(address).then(
            function(val) {
                that.geoLocation = val;
                that.weatherService.setWeatherLocation(that.geoLocation);
            }
        );
    }
}

bootstrap(WeatherApp);
