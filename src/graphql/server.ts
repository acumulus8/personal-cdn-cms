import { ApolloServer } from '@apollo/server';
import { schema } from './schema';

export const apolloServer = new ApolloServer({ schema });
