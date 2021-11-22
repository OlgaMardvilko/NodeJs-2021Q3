import { DataTypes, Model, UUIDV4 } from 'sequelize';
import { sequelize } from '../data-access/db';
import { GroupModel } from './group.model';
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
);

export const UserGroupModel = sequelize.define(
  'UserGroup',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: 'user_group',
    timestamps: false
  },
);

UserModel.belongsToMany(GroupModel, { through: UserGroupModel });
GroupModel.belongsToMany(UserModel, { through: UserGroupModel });