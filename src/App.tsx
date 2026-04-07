import { useEffect, useState } from 'react';
import type { IForecastData, IAirPollution, IWeatherData } from './types/weather';
import { CitySelector } from './components/CitySelector';
import { CurrentWeather } from './components/CurrentWeather';
import { AirQuality } from './components/AirQuality';
import { WeatherForecast } from './components/WeatherForecast';
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
  const [pollution, setPollution] = useState<IAirPollution | null>(null);
  const [forecast, setForecast] = useState<IForecastData | null>(null);

  const activeCityRu = CITIES.find(city => city.id === activeCity)?.ru;
  
  useEffect(() => {
    
    const fetchData = async () => {
      setLoading(true);
      try {
        
        const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${activeCity}&limit=1&appid=${MY_API_KEY}`);
        const geoData = await geoRes.json();

        if (geoData.length > 0) {
          const { lat, lon } = geoData[0];

          const [weatherRes, pollutionRes, forecastRes] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${MY_API_KEY}&units=metric&lang=ru`),
            fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${MY_API_KEY}`),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${MY_API_KEY}&units=metric&lang=ru`)
          ]);

          const weatherJson = await weatherRes.json();
          const pollutionJson = await pollutionRes.json();
          const forecastJson = await forecastRes.json();
          
          setData(weatherJson);
          setPollution(pollutionJson);
          setForecast(forecastJson);
        }
      } catch (error) {
        console.error("Ошибка загрузки данных", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, THREE_HOURS);
    return () => clearInterval(intervalId);
  }, [activeCity]);

    const getThemeClass = () => {
    if (!data) return 'theme-default';
    
    const mainWeather = data.weather[0]?.main;

    switch (mainWeather) {
      case 'Clear': return 'theme-sunny';
      case 'Clouds': return 'theme-cloudy';
      case 'Rain':
      case 'Drizzle': return 'theme-rainy';
      case 'Thunderstorm': return 'theme-stormy';
      case 'Snow': return 'theme-snowy';
      default: return 'theme-default';
    }
  };
  const currentTheme = getThemeClass();
  
  return (
    <div className={`App ${currentTheme}`}>
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
        <>
          {data && <CurrentWeather data={data} cityNameRu={activeCityRu} />}
          {pollution && <AirQuality data={pollution} />}
          {forecast && <WeatherForecast data={forecast} />}
        </>
      )}
    </div>
  );
}

export default App;