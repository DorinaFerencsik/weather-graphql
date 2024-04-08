import { Location, MeteoDailyResponse, MeteoLocationResponse, WeatherForecast } from './types';

const BASE_URL = 'https://api.open-meteo.com/v1';
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1'


export const mapMeteoForecasts = (data: MeteoDailyResponse): WeatherForecast[] => {
  const forecasts: WeatherForecast[] = data.daily.time.map((time, i) => ({
    date: time,
    minimum: data.daily.temperature_2m_min[i],
    maximum: data.daily.temperature_2m_max[i],
    weatherCode: data.daily.weather_code[i],
  }))

  return forecasts
}

export async function getForecasts(latitude: number, longitude: number, timezone?: string) {
  const response = await fetch(
    `${BASE_URL}/forecast?` + new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      timezone,
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,rain_sum,showers_sum,snowfall_sum',
      forecastDays: '7'
    }),
    {
      method: 'GET',
    }
  );

  const data = await response.json();

  return mapMeteoForecasts(data);
}

export const mapMeteoLocation = (locations: MeteoLocationResponse[]): Location[] => {
  return locations.map(location => ({
    name: location.name,
    country: location.country,
    countryCode: location.country_code,
    timezone: location.timezone,
    latitude: location.latitude,
    longitude: location.longitude
  }))
}

export async function getLocations(name: string) {
  const response = await fetch(
    `${GEOCODING_URL}/search?` + new URLSearchParams({
      name
    }),
    {
      method: 'GET'
    }
  );

  const data = await response.json();

  return mapMeteoLocation(data.results);
}
