
export class GeoLocation {

    name: string;
    latitude: number;
    longitude: number;

    constructor(data) {
        data = data || {};
        var geo  = ( data.geometry && data.geometry.location ? data.geometry.location : {});

        this.name      = data.formatted_address || '';
        this.latitude  = geo.lat || 0;
        this.longitude = geo.lng || 0;
    }
}
