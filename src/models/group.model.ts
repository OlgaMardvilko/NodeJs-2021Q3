import { DataTypes, Model, UUIDV4 } from 'sequelize';
import { sequelize } from '../data-access/db';
import { IGroup, IGroupBase, Permission } from './group.interface';

export class GroupModel extends Model<IGroup, IGroupBase> implements IGroup {
  id!: string;
  name!: string;
  permission!: Permission[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date
}

GroupModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    permission: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    tableName: 'groups',
    sequelize,
    modelName: 'Group',
  },
)