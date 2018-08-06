import express from 'express';
import GraphHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import cors from 'cors';

import Sschema from './src/schema';

import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

// Const
const PORT = 4000;
const server = express();

// Connection with client
server.use('*', cors({ origin: 'http://localhost:3000' }));


// GraphQL
server.use('/graphql', GraphHTTP({
  schema: Sschema,
  pretty: true,
  graphiql: true
}));

// Listen
server.listen(PORT, () => 
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`)
);
