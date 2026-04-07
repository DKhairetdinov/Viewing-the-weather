import React from 'react';
import type { IForecastData } from '../types/weather';

interface Props {
  data: IForecastData;
}

export const WeatherForecast: React.FC<Props> = ({ data }) => {
  const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  return (
    <div className="forecast-container">
      <h3>Прогноз на 5 дней (12:00)</h3>
      <div className="forecast-list">
        {dailyData.map((day) => (
          <div key={day.dt} className="forecast-item">
            <span>{new Date(day.dt * 1000).toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric' })}</span>
            <img 
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
              alt="icon" 
            />
            <span className="forecast-temp">{Math.round(day.main.temp)}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
};