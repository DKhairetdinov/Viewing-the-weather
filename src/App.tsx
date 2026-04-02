import { useEffect,  useState } from 'react';
// import { IWeatherData } from './types/weather';
import './App.css';

const MY_API_KEY:string = '5cac5f7d03be496d1151674570df302b';
const CITY_NAME:string[] = ['Novosibirsk', 'Moscow', 'Kemerovo', 'Tokyo'];

function App() {
  const [data, setData] = useState<any>();
  const [activeCity, setActiveCity] = useState(CITY_NAME[0]);
  const [loading, setLoading] = useState(false);
   
  useEffect(() => {
    const getWeatherData =  async() => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${activeCity}&appid=${MY_API_KEY}&units=metric&lang=ru`);
        const json = await response.json();
        setData(json);
        console.log(json);
      } catch(error) {
        console.error("Error making request", error);
      } finally {
        setLoading(false);
      }
    };
    getWeatherData();
  }, [activeCity]);
  
  return(
    <div className='App'>
      <p className='header'>Weather in your city</p>
        <div className='citySelector'> 
          {CITY_NAME.map((cityName) => (
            <button key={cityName} 
            className={activeCity === cityName ? 'active-btn' : 'none-active-btn'}
            onClick={() => setActiveCity(cityName)}
            >
              {cityName}
            </button>
          ))}
        </div>
        
        <hr className='line-separator'/>

      {loading ? (
        <p>Downloading data in {activeCity}</p>
      ) : (
        data && (
        <div className='Object-city'>
          <p>City: {data.name}</p>
          <p>Temp: {data.main.temp}</p>
          <p>Outside: {data.weather[0].description}</p>
        </div>
      )
      )}
    </div>
  );
}

export default App