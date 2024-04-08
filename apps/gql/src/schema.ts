import { IResolvers } from '@graphql-tools/utils'
import { getForecasts, getLocations } from './forecast';

export const typeDefs = /* GraphQL */ `
  type Query {
    hello: String
    forecasts(latitude: Float!, longitude: Float!, timezone: String): [WeatherForecast]
    locations(name: String!): [Location!]
  }

  type WeatherForecast {
    date: String!
    minimum: Float!
    maximum: Float!
    weatherCode: Int!
  }

  type Location {
    name: String!
    country: String!
    countryCode: String!
    latitude: Float!
    longitude: Float!
    timezone: String!
  }
`

export const resolvers: IResolvers = {
  Query: {
    hello: () => 'Hello from schema',
    forecasts: (_, args) => {
      return getForecasts(args.latitude, args.longitude, args.timezone);
    },
    locations: (_, args) => {
      return getLocations(args.name);
    }
  }
}

