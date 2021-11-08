import { Sequelize } from 'sequelize';

const DB_CONNECTION_STRING = 'postgres://gdfihmjy:rjIaZRkub5K0wjt8lp3UCMChut0jsQKU@isilo.db.elephantsql.com/gdfihmjy';

export const sequelize: Sequelize = new Sequelize(DB_CONNECTION_STRING);