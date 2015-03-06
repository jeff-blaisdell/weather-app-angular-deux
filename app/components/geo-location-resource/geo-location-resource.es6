import {GeoLocation} from 'components/geo-location/geo-location';
import jQuery from 'jquery';

export class GeoLocationResource {

    constructor() {

    }

    getGeoLocation(address: string): Promise<GeoLocation> {
        return new Promise(function(resolve, reject) {
            jQuery.ajax({
                url: 'https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=' + address,
                dataType: 'json',
                cache: true
            }).done(function(res) {
                var data = res.results[0];
                resolve(new GeoLocation(data));
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown)
                reject({ message: 'Unable to retrieve result from Google Geocode API.' });
            });
        });
    }
}
