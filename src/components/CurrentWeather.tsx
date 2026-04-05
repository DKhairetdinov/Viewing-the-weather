import React from 'react';
import type { IWeatherData } from '../types/weather';

interface Props {
  data: IWeatherData;
  cityNameRu: string | undefined;
}

export const CurrentWeather: React.FC<Props> = ({ data, cityNameRu }) => {
  return (
    <div className='Object-city'>
      <h2>{cityNameRu}</h2>
      <p style={{ fontSize: '2rem', margin: '10px 0' }}>
        {Math.round(data.main.temp)}°C
      </p>
      <p>{data.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="icon"
      />
    </div>
  );
};