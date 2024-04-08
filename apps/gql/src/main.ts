import express from 'express';
import { createSchema, createYoga } from 'graphql-yoga'
import { resolvers, typeDefs } from './modules/forecast/schema/forecast.graphql';
import { execute, parse, specifiedRules, subscribe, validate } from 'graphql'
import { useApolloDataSources } from '@envelop/apollo-datasources'
import { envelop, useEngine, useSchema } from '@envelop/core'
import { ForecastAPI } from './datasources/forecast-api';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});


const USE_MODULES = false;

let yoga;

if (USE_MODULES) {
  yoga = createYoga({
    schema: createSchema({
      typeDefs,
      resolvers: {
        Query: {
          hello: () => 'Hello from schema',
          forecasts: (_, args) => {
            return new ForecastAPI().getForecasts(args.latitude, args.longitude, args.timezone);
          },

        }
      },
    }),
    // context: (req) => ({
    //   ...req,
    //   dataSource: new ForecastAPI()
    // }),
    plugins: [
      useEngine({ parse, validate, specifiedRules, execute, subscribe }),
      // useSchema(mySchema),
      useApolloDataSources({
        dataSources() {
          return {
            forecastAPI: new ForecastAPI()
          }
        }
        // To provide a custom cache, you can use the following code (InMemoryLRUCache is used by default):
        // cache: new YourCustomCache()
      })
    ]
  })
} else {
  yoga = createYoga({
    schema: createSchema({
      typeDefs,
      resolvers,
    }),
  })

}

app.use(yoga.graphqlEndpoint, yoga)

app.listen(port, host, () => {
  console.log(`
  [ ready ] http://${host}:${port}
  [ graphql ] http://${host}:${port}/graphql
  `);
});
