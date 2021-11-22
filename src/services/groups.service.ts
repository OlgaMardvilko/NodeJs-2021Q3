import { sequelize } from '../data-access/db';
import { UserGroupModel } from '../models/user.model';
import { IGroupBase, IGroup } from '../models/group.interface';
import { GroupModel } from '../models/group.model';

export const getGroupById = async (id: string): Promise<IGroup | null> => {
  const group = await GroupModel.findByPk(id);
  return group;
};

export const getAllGroups = async (): Promise<IGroup[]> => {
  const allGroups = await GroupModel.findAll();
  return allGroups;
};

export const createGroup = async (group: IGroupBase): Promise<IGroup> => {
  const newGroup = await GroupModel.create(group);
  return newGroup;
};

export const updateGroup = async (updateGroup: IGroup, id: string): Promise<IGroup | null> => {
  const [numberOfEffectedRow, updatedGroup] : [number, GroupModel[]] = await GroupModel.update(updateGroup, {
    where: {
      id,
    },
  });

  return numberOfEffectedRow ? updatedGroup[0] : null;
};

export const removeGroup = async (id: string): Promise<number> => {
  const deletedNumber = await GroupModel.destroy(
    {
      where: {
        id,
      },
    }
  );

  return deletedNumber;
};

export const addUsersToGroup = async(id: string, userIds: string[]): Promise<any> => {
  try {
    await sequelize.transaction(async trans => {
      const resArray =  UserGroupModel.bulkCreate(
        userIds.map(userId => ({
          UserId: userId,
          GroupId: id,
        })),
        { transaction: trans },
      );
      return resArray;
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
