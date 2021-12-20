import { Op } from 'sequelize';
import { IBaseUser, IUser } from '../models/user.interface';
import { UserModel } from '../models/user.model';
import { Config } from '../common/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const jwtSecret = Config.JWT_SECRET;

export const login = async (login: string, password: string): Promise<string | null> => {
  const user = await UserModel.findOne({
    where: {
      login,
    },
  });

  if (user) {
    const compareResult: boolean = await bcrypt.compare(password, user.password);

    if (compareResult) {
      const token: string = jwt.sign({ sid: user.id }, jwtSecret, { expiresIn: '3h' });
      return token;
    }
  }
  return null;
}

export const getUserById = async (id: string): Promise<IUser | null> => {
  const user = await UserModel.findByPk(id);
  return user;
};

export const createUser = async (user: IBaseUser): Promise<IUser> => {
  const salt: string = await bcrypt.genSalt(10);
  const hash: string = await bcrypt.hash(user.password, salt);
  const newUser: IUser = await UserModel.create({ ...user, password: hash });
  return newUser;
};

export const updateUser = async (updateUser: IUser, id: string): Promise<IUser | null> => {
  const salt: string = await bcrypt.genSalt(10);
  const hash: string = await bcrypt.hash(updateUser.password, salt);

  const [numberOfEffectedRow, updatedUser] : [number, UserModel[]] = await UserModel.update(
    {
      ...updateUser,
      password: hash,
    },
    {
      where: {
        id,
      },
    },
  );

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
