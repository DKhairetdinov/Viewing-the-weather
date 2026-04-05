import { useEffect, useState } from 'react';
import type { IWeatherData } from './types/weather';
import { CitySelector } from './components/CitySelector';
import { CurrentWeather } from './components/CurrentWeather';
import './App.css';

const CITIES = [
  { id: 'Novosibirsk', ru: 'Новосибирск' },
  { id: 'Moscow', ru: 'Москва' },
  { id: 'Kemerovo', ru: 'Кемерово' },
  { id: 'Tokyo', ru: 'Токио' }
];
const MY_API_KEY = '5cac5f7d03be496d1151674570df302b';
const THREE_HOURS = 3 * 60 * 60 * 1000;

function App() {
  const [data, setData] = useState<IWeatherData | null>(null);
  const [activeCity, setActiveCity] = useState(CITIES[0].id);
  const [loading, setLoading] = useState(false);

  const activeCityRu = CITIES.find(city => city.id === activeCity)?.ru;

  useEffect(() => {
    const getWeatherData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${activeCity}&appid=${MY_API_KEY}&units=metric&lang=ru`);
        const json: IWeatherData = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
    const intervalId = setInterval(getWeatherData, THREE_HOURS);
    return () => clearInterval(intervalId);
  }, [activeCity]);

  return (
    <div className='App'>
      <p className='header'>Погода в вашем городе</p>
      
      <CitySelector 
        cities={CITIES} 
        activeCity={activeCity} 
        onSelect={setActiveCity} 
      />
      
      <hr className='line-separator' />

      {loading ? (
        <p>Загрузка погоды для города {activeCityRu}...</p>
      ) : (
        data && <CurrentWeather data={data} cityNameRu={activeCityRu} />
      )}
    </div>
  );
}

export default App;