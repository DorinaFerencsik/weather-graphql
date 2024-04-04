import express from 'express';
import { createSchema, createYoga } from 'graphql-yoga'

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => 'Hello from Yoga!'
      }
    }
  })
})

app.use(yoga.graphqlEndpoint, yoga)

app.listen(port, host, () => {
  console.log(`
  [ ready ] http://${host}:${port}
  [ graphql ] http://${host}:${port}/graphql
  `);
});
