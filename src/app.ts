require('tsconfig-paths/register');
import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { graphqlHTTP } from 'express-graphql';
import path from 'path';
import fs from 'fs';
import 'reflect-metadata';
import connectToDatabase from './database/connect';

import apiRouter from './routes/index';
import schema from './graphql/schema';

/**
 *  Initialize Express Server
 */
const app = express();
connectToDatabase();
/**
 *  Setup Request logging
 */
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

app.use(
  morgan(logFormat, {
    skip: function (_req, res) {
      if (process.env.NODE_ENV === 'test') {
        return true;
      }

      return res.statusCode < 400;
    },
    stream: process.stderr,
  }),
);

app.use(
  morgan(logFormat, {
    skip: function (_req, res) {
      if (process.env.NODE_ENV === 'test') {
        return true;
      }

      return res.statusCode >= 400;
    },
    stream: process.stdout,
  }),
);
app.disable('x-powered-by');
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Api Routes Handler */
app.use('/api', apiRouter);

/* Graphql Routes Handler */
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

/* Build For Deploying SPA bundles */
const clientPath = path.join(__dirname, '../', 'client/build');

if (fs.existsSync(clientPath)) {
  app.use(express.static(clientPath));
  app.get('/*', (_req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
}

// catch 404 and forward to error handler
app.use(function (_req: express.Request, _res: express.Response, next: express.NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (
  err: any,
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

export default app;
