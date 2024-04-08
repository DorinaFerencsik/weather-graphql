import { RESTDataSource } from 'apollo-datasource-rest'
import { mapMeteoForecasts } from '../forecast'

export class ForecastAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://api.open-meteo.com/v1/forecast'
  }


  async getForecasts(latitude: number, longitude: number, timezone?: string) {
    const data = await this.get('', {
      params: {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        timezone,
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,rain_sum,showers_sum,snowfall_sum',
        forecastDays: '7'
      }
    })
    return mapMeteoForecasts(data);
  }
}
