import express, { Express } from 'express';
import { usersRouter } from './routes/users.router';
import { homeRouter } from './routes/home.router';
import { sequelize } from './data-access/db';

const PORT: number = Number(process.env.port) || 3000;
const green = (text: number) => `\x1b[32m${text}\x1b[0m`;
const app = express();
const router: Express = express();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

/** Routes */
router.use('/users', usersRouter);
router.use('/', homeRouter);

app.use('/api', router);

app.listen(PORT, async() => {

  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Successful connect to DB');
    await sequelize.sync({ force: true });
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${green(PORT)}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Unable to connect to DB: ${error}`);
  }
});
