import UsersController from './users.controller';
import { interceptor } from '../util/interceptor';
import { ResponseCode, ResponseMessage } from '../common/common.consts';
import { IBaseUser } from '../models/user.interface';

describe('UsersController', () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = interceptor.mockRequest();
    res = interceptor.mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#getUserById', () => {
    it('should return 200 and correct value', async () => {
      req.params.id = '646b1af9-c1b4-43d6-b974-14291ff6e791';
  
      await UsersController.getUserById(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.Success);
    });

    it('should return 404 and correct value', async () => {
      req.params.id = null;
  
      await UsersController.getUserById(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.NotFound);
      expect(res.send).toHaveBeenCalledWith(ResponseMessage.NotFoundUser);
    });

    it('should return 500 and correct value', async () => {
      req.params.id = '1';
  
      await UsersController.getUserById(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.ServiceError);
    });
  });

  describe('#createUser', () => {
    it('should return 201 and create user', async () => {
      const mockUser: IBaseUser = {
        login: 'mockLogin',
        password: 'mockPassword',
        age: 20,
        isDeleted: false
      }
      req.body = mockUser;
  
      await UsersController.createUser(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.Created);
    });

    it('should return 400 if validation error', async () => {
      const mockUser: IBaseUser = {
        login: '',
        password: 'mockPassword',
        age: 20,
        isDeleted: false
      }
      req.body = mockUser;
  
      await UsersController.createUser(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.BadRequest);
    });
  });

  describe('#updateUser', () => {
    it('should return 200 and update user', async () => {
      req.params.id = '31755925-fdb4-48ee-ae3b-e574a20e1662';
      const mockUser: IBaseUser = {
        login: 'mock',
        password: 'mockPassword',
        age: 20,
        isDeleted: false
      }
      req.body = mockUser;
  
      await UsersController.updateUser(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.Success);
    });

    it('should return 400 if validation error', async () => {
      const mockUser: IBaseUser = {
        login: '',
        password: 'mockPassword',
        age: 20,
        isDeleted: false
      }
      req.body = mockUser;
  
      await UsersController.updateUser(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.BadRequest);
    });
  });

  describe('#getUsersList', () => {
    it('should return 200 and correct value', async () => {
      req.query.loginSubstring = '';
      req.query.limit = 2;
      await UsersController.getUsersList(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.Success);
    });
  });

  describe('#removeUser', () => {
    it('should return 200 and correct value', async () => {
      req.params.id = '3074f077-ccca-4953-9e22-440ad04d3e3e';

      await UsersController.removeUser(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.Success);
    });

    it('should return 500 if id is not valid', async () => {
      req.params.id = '1';
  
      await UsersController.removeUser(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.ServiceError);
    });
  
    it('should return 404 if id is not find', async () => {
      req.params.id = null;
  
      await UsersController.removeUser(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.NotFound);
    });
  });
});
