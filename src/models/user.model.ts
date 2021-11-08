import { DataTypes, Model, UUIDV4 } from 'sequelize';
import { sequelize } from '../data-access/db';
import { IUser, IBaseUser } from './user.interface';

export class UserModel extends Model<IUser, IBaseUser> implements IUser {
  id!: string;
  login!: string;
  password!: string;
  age!: number;
  isDeleted!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    tableName: 'users',
    sequelize,
    modelName: 'User',
  },
)