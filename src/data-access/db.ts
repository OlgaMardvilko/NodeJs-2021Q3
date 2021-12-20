import { Sequelize } from 'sequelize';
import { Config } from '../common/config';

export const sequelize: Sequelize = new Sequelize(Config.DB_CONNECTION);