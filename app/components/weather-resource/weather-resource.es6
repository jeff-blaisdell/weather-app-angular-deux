import {Forecast} from 'components/forecast/forecast';

export class WeatherResource {

    forecastIoApiKey: string;

    constructor() {

    }

    getWeather(lat: number, lon: number): Promise<Forecast> {
        return new Promise(function(resolve, reject) {
            jQuery.ajax({
                url: 'https://api.forecast.io/forecast/' + window.forecastIoApiKey + '/' + lat + ',' + lon,
                dataType: 'jsonp',
                cache: true
            }).done(function(res) {;
                resolve(new Forecast(res.daily.data));
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown)
                reject({ message: 'Unable to retrieve result from Google Geocode API.' });
            });
        });
    }

}
