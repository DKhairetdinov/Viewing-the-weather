export interface IWeatherData {
    name: string;
    main: {
        temp: number;
        humidity: number;
        pressuer: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    wing: {
        speed: number;
    };
}