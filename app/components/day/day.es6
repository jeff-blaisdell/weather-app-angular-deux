
var DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var IMAGES = {
    'clear-day': '/images/sun.svg',
    'clear-night': '/images/moon.svg',
    'rain': '/images/raindrop.svg',
    'snow': '/images/snow.svg',
    'sleet': '/images/snow.svg',
    'wind': '/images/wind.svg',
    'fog': '/images/cloud.svg',
    'cloudy': '/images/cloud.svg',
    'partly-cloudy-day': '/images/cloud.svg',
    'partly-cloudy-night': '/images/cloud.svg',
    'hail': '/images/raindrop.svg',
    'thunderstorm': '/images/raindrop.svg',
    'tornado': '/images/tornado.svg'
};

export class Day {

    time: Date;
    icon: string;
    temperatureMin: number;
    temperatureMax: number;
    dewPoint: number;
    humidity: number;
    windSpeed: number;
    precipProbability: number;

    constructor(day) {
        this.time = new Date(day.time * 1000);
        this.icon = day.icon;
        this.temperatureMin = (typeof day.temperatureMin === 'number' ? Math.round(day.temperatureMin) : 0);
        this.temperatureMax = (typeof day.temperatureMax === 'number' ? Math.round(day.temperatureMax) : 0);
        this.dewPoint = day.dewPoint;
        this.humidity = (typeof day.humidity === 'number' ? Math.round(day.humidity) : 0);
        this.windSpeed = (typeof day.windSpeed === 'number' ? Math.round(day.windSpeed) : 0);
        this.precipProbability = (typeof day.precipProbability === 'number' ? day.precipProbability * 100 : 0);
    }

    getImageUrl(): string {
        return IMAGES[this.icon];
    }

    getDayOfWeek(): string {
        return DAYS_OF_WEEK[this.time.getUTCDay()];
    }

    getMonth(): string {
        return MONTHS[this.time.getUTCMonth()];
    }

}
