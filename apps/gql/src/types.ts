
// TODO: Use codegen generated one instead
export interface WeatherForecast {
  date: string;
  minimum: number;
  maximum: number;
  weatherCode: number
}

// TODO: Use codegen generated one instead
export interface Location {
  name: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface MeteoDailyResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: {
    time: string,
    weather_code: string
    temperature_2m_max: string,
    temperature_2m_min: string,
    rain_sum: 'mm',
    showers_sum: 'mm',
    snowfall_sum: 'cm',
  },
  daily: {
    time: string[],
    weather_code: number[],
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    rain_sum: number[];
    showers_sum: number[];
    snowfall_sum: number[];
  }
}

export interface MeteoLocationResponse {
  id: number,
  /** Name of location */
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  timezone: string;
  /** Name of country */
  country: string;
  /** Two letter ISO code of country */
  country_code: string;
  country_id: number
  /** Name of county of location */
  admin1: string;
  /** ID of county */
  admin1_id: number;
}

