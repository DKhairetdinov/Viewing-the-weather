import React from 'react';

interface City {
  id: string;
  ru: string;
}

interface Props {
  cities: City[];
  activeCity: string;
  onSelect: (id: string) => void;
}

export const CitySelector: React.FC<Props> = ({ cities, activeCity, onSelect }) => {
  return (
    <div className='citySelector'>
      {cities.map((city) => (
        <button
          key={city.id}
          className={activeCity === city.id ? 'active-btn' : 'none-active-btn'}
          onClick={() => onSelect(city.id)}
        >
          {city.ru}
        </button>
      ))}
    </div>
  );
};