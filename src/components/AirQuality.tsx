import React from 'react';
import type { IAirPollution } from '../types/weather';

interface Props {
  data: IAirPollution;
}

export const AirQuality: React.FC<Props> = ({ data }) => {
  const aqi = data.list[0].main.aqi;
  const labels = ['Отличное', 'Хорошее', 'Умеренное', 'Плохое', 'Очень плохое'];
  const colors = ['#2ecc71', '#f1c40f', '#e67e22', '#e74c3c', '#8e44ad'];

  return (
    <div className="air-quality" style={{ color: colors[aqi - 1], marginTop: '10px' }}>
      <p>Качество воздуха: <strong>{labels[aqi - 1]}</strong></p>
      <small>PM2.5: {data.list[0].components.pm2_5} μg/m³</small>
    </div>
  );
};