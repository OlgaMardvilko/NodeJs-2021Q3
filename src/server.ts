import express, { Express } from 'express';
import { sequelize } from './data-access/db';
import { usersRouter } from './routes/users.router';
import { homeRouter } from './routes/home.router';
import { groupsRouter } from './routes/groups.router';
import { errorMiddleware, loggerMiddleware } from './middlewares/loggers.middleware';
import { logger } from './common/logger';
import { Config } from './common/config';
import cors, { CorsOptions } from 'cors';

const PORT = Config.PORT || 3000;
const green = (text: number) => `\x1b[32m${text}\x1b[0m`;
const app = express();
const router: Express = express();
const corsOptions: CorsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

/** Routes */
router.use('/users', usersRouter);
router.use('/groups', groupsRouter);
router.use('/', homeRouter);

app.use(cors(corsOptions));
app.use(loggerMiddleware);
app.use(errorMiddleware);
app.use('/api', router);

app.listen(PORT, async() => {

  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Successful connect to DB');
    // await sequelize.sync({ force: true });
    await sequelize.sync({ alter: true });
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${green(PORT)}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Unable to connect to DB: ${error}`);
  }
});

process.on('uncaughtException', error => {
  logger.error(`uncaughtException: ${JSON.stringify(error)}`);
});

process.on('unhandledRejection', error => {
  logger.error(`unhandledRejection: ${JSON.stringify(error)}`);
});