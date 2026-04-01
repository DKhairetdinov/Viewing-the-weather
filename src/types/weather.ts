export interface IWeatherResponse {
    name: string;
    main: {
        temp: number;
        humidity: number;
        pressure: number;
    };
}