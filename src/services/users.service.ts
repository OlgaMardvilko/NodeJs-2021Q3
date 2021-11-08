import { Op } from 'sequelize';
import { IBaseUser, IUser } from '../models/user.interface';
import { UserModel } from '../models/user.model';

export const getUserById = async (id: string): Promise<IUser | null> => {
  const user = await UserModel.findByPk(id);
  return user;
};

export const createUser = async (user: IBaseUser): Promise<IUser> => {
  const newUser = await UserModel.create(user);
  return newUser;
};

export const updateUser = async (updateUser: IUser, id: string): Promise<IUser | null> => {
  const [numberOfEffectedRow, updatedUser] : [number, UserModel[]] = await UserModel.update(updateUser, {
    where: {
      id,
    },
  });

  return numberOfEffectedRow ? updatedUser[0] : null;
};

export const getAutoSuggestUsers = async (loginSubstring: string, limit: number): Promise<IUser[]> => {
  const filteredUsers = await UserModel.findAll({
    where: {
      isDeleted: false,
      login: {
        [Op.like]: `%${loginSubstring}`,
      },
    },
    limit,
  });

  return filteredUsers;
};

export const removeUser = async (id: string): Promise<IUser | null> => {
  const [numberOfEffectedRow, updatedUser] : [number, UserModel[]] = await UserModel.update(
    { isDeleted: true },
    {
      where: {
        id,
      },
    }
  );

  return numberOfEffectedRow ? updatedUser[0] : null;
};
