import { v4 } from 'uuid';
import { IBaseUser, IUser } from '../models/user.interface';

const users: IUser[] = [
  {
    id: '646b1af9-c1b4-43d6-b974-14291ff6e791',
    login: 'login1',
    password: 'password1',
    age: 20,
    isDeleted: false,
  },
  {
    id: '646b1af9-c1b4-43d6-b974-14291ff6e792',
    login: 'login2',
    password: 'password2',
    age: 28,
    isDeleted: false,
  },
  {
    id: '646b1af9-c1b4-43d6-b974-14291ff6e793',
    login: 'login3',
    password: 'password3',
    age: 32,
    isDeleted: false,
  },
];

const findUserById = (id: string) => {
  return users.find((user) => user.id === id);
};

export const getUserById = async (id: string): Promise<IUser> => {
  return findUserById(id) as IUser;
};

export const createUser = async (user: IBaseUser): Promise<IUser> => {
  const newUser = {
    id: v4(),
    ...user,
  };

  users.push(newUser);
  return newUser;
};

export const updateUser = async (updateUser: IUser, id: string): Promise<IUser> => {
  const currentUser = findUserById(id) as IUser;

  if (currentUser) {
    Object.assign(currentUser, updateUser);
  }

  return currentUser;
};

export const getAutoSuggestUsers = async (loginSubstring: string, limit: number): Promise<IUser[]> => {
  let filteredUsers = users.filter((user) => !user.isDeleted);

  if (loginSubstring && loginSubstring.length) {
    filteredUsers = filteredUsers.filter((item) => item.login.includes(loginSubstring));
  }

  if (limit) {
    filteredUsers = filteredUsers.slice(0, limit);
  }

  return filteredUsers;
};

export const removeUser = async (id: string): Promise<IUser> => {
  const user = findUserById(id) as IUser;

  if (user) {
    Object.assign(user, { ...user, isDeleted: true });
  }

  return user;
};
