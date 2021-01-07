import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import database from './src/v1/config/database.js';
import userRoute from './src/v1/routes/users.js';
import swaggerSpec from './swaggerSpec.js';

const app = express();

database(app);
dotenv.config();

app.enable('trust proxy');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/users', userRoute);

app.use((req, res, next) => {
  const err = new Error('404 not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: error.message
    }
  });
});
