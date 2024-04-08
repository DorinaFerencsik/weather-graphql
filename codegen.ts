import type { IGraphQLConfig } from 'graphql-config';

const sharedSchema = ['apps/gql/src/modules/**/*.graphql.ts'];

const sharedPlugins = [
  'typescript',
  'typescript-operations',
];

const config: IGraphQLConfig = {
  projects: {
    gql: {
      schema: sharedSchema,
      extensions: {
        codegen: {
          hooks: {
            afterOneFileWrite: ['prettier --config .prettierrc --write'],
          },
          generates: {
            './apps/gql/graphql.schema.json': {
              plugins: ['introspection'],
            },
            './apps/gql/schema.graphql': {
              plugins: ['schema-ast'],
            },
          },
        }
      }
    },
    'touchpoint-web': {
      schema: sharedSchema,
      extensions: {
        codegen: {
          generates: {
            './apps/touchpoint-web/src/app/types/index.ts': {
              plugins: sharedPlugins,
              documents: ['./apps/touchpoint-web/src/**/*.graphql'],
            },
          }
        }
      }
    }
  },
};

export default config;
