export interface IWeatherData {
    name: string;
    main: {
        temp: number;
        humidity: number;
        pressuer: number;
    };
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
    wing: {
        speed: number;
    };
}

export interface IAirPollution {
  list: {
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no2: number;
      o3: number;
      pm2_5: number;
    };
  }[];
}

export interface IForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
    };
    weather: {
      icon: string;
      description: string;
    }[];
    dt_txt: string; // "2024-03-20 12:00:00"
  }[];
}