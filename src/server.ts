import express, { Express } from 'express';
import { usersRouter } from './routes/users.router';
import { homeRouter } from './routes/home.router';

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

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${green(PORT)}`);
});
