import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import App from './App';

const mockGeo = [{ lat: 55.01, lon: 82.94 }];
const mockWeather = {
  name: 'Novosibirsk',
  main: { temp: 10, humidity: 80, pressure: 1000 },
  weather: [{ description: 'ясно', icon: '01d', main: 'Clear' }],
  wind: { speed: 5 }
};
const mockPollution = { list: [{ main: { aqi: 1 }, components: { pm2_5: 2 } }] };
const mockForecast = { list: [] };

global.fetch = vi.fn((url: string) => {
  if (url.includes('geo/1.0/direct')) {
    return Promise.resolve({ ok: true, json: async () => mockGeo });
  }
  if (url.includes('data/2.5/weather')) {
    return Promise.resolve({ ok: true, json: async () => mockWeather });
  }
  if (url.includes('air_pollution')) {
    return Promise.resolve({ ok: true, json: async () => mockPollution });
  }
  if (url.includes('forecast')) {
    return Promise.resolve({ ok: true, json: async () => mockForecast });
  }
  return Promise.reject(new Error('Unknown API call'));
}) as any;

describe('Weather App', () => {
  it('должен отображать погоду на русском языке после загрузки', async () => {
    render(<App />);

    expect(screen.getByText(/Загрузка погоды/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Новосибирск/i, level: 2 })).toBeInTheDocument();
      
      expect(screen.getByText(/10/)).toBeInTheDocument();
      
      expect(screen.getByText(/Отличное/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    console.log("✅ Тест успешно прошел с имитацией всех API!");
  });
});