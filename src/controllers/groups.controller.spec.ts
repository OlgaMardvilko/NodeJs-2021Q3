import GroupController from './groups.controller';
import { interceptor } from '../util/interceptor';
import { ResponseCode, ResponseMessage } from '../common/common.consts';
import { IGroupBase } from '../models/group.interface';

describe('GroupController', () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = interceptor.mockRequest();
    res = interceptor.mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#getGroupById', () => {
    it('should return 200 and correct value', async () => {
      req.params.id = 'c8b7dbff-43dd-4c86-a370-9313c649fe66';
  
      await GroupController.getGroupById(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.Success);
    });

    it('should return 404 and correct value', async () => {
      req.params.id = null;
  
      await GroupController.getGroupById(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.NotFound);
      expect(res.send).toHaveBeenCalledWith(ResponseMessage.NotFoundGroup);
    });

    it('should return 500 and correct value', async () => {
      req.params.id = '1';
  
      await GroupController.getGroupById(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.ServiceError);
    });
  });

  describe('#createGroup', () => {
    it('should return 201 and create group', async () => {
      const nameRandom = Math.random().toString(36).substr(2, 5);
      const mockGroup: IGroupBase = {
        name: nameRandom,
        permission: ['READ']
      }
      req.body = mockGroup;
  
      await GroupController.createGroup(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.Created);
    });

    it('should return 400 if validation error', async () => {
      const mockGroup: IGroupBase = {
        name: '',
        permission: ['READ']
      }
      req.body = mockGroup;
  
      await GroupController.createGroup(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.BadRequest);
    });

    it('should return 500 if name is not unique', async () => {
      const mockGroup: IGroupBase = {
        name: 'group2',
        permission: ['READ']
      }
      req.body = mockGroup;
  
      await GroupController.createGroup(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.ServiceError);
    });
  });

  describe('#updateGroup', () => {
    it('should return 200 and update group', async () => {
      req.params.id = 'be46a7b8-d980-4e46-91ce-f876ec7ebbd7';
      const nameRandom = Math.random().toString(36).substr(2, 5);
      const mockGroup: IGroupBase = {
        name: nameRandom,
        permission: ['READ']
      }
      req.body = mockGroup;
  
      await GroupController.updateGroup(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.Success);
    });

    it('should return 400 if validation error', async () => {
      req.params.id = 'bfad2bab-0f97-4559-a09d-040641424f4d';
      const mockGroup: IGroupBase = {
        name: '',
        permission: ['READ']
      }
      req.body = mockGroup;
  
      await GroupController.updateGroup(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.BadRequest);
    });

    it('should return 500 if name is not unique', async () => {
      req.params.id = '1';
      const mockGroup: IGroupBase = {
        name: 'group1',
        permission: ['READ']
      }
      req.body = mockGroup;
  
      await GroupController.updateGroup(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.ServiceError);
    });
  });

  describe('#getGroupsList', () => {
    it('should return 200 and correct value', async () => {
      await GroupController.getGroupsList(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.Success);
    });
  });

  describe('#removeGroup', () => {
    it('should return 200 and correct value', async () => {
      req.params.id = '77af024f-483b-4604-908a-2c2d87b5d08a';

      await GroupController.removeGroup(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.Success);
    });

    it('should return 500 if id is not valid', async () => {
      req.params.id = '1';
  
      await GroupController.removeGroup(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.ServiceError);
    });
  
    it('should return 404 if id is not find', async () => {
      req.params.id = null;
  
      await GroupController.removeGroup(req, res);
  
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(ResponseCode.NotFound);
    });
  });
});
