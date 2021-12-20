export enum ResponseCode {
  Success = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  ServiceError = 500,
  Unauthorized = 401,
  Forbidden = 403,
}

export enum ResponseMessage {
  HomePageSuccess = 'Hello World!',
  NotFoundUser = 'User not found',
  NotFoundUsers = 'Users not found',
  NotFoundGroup = 'Group not found',
  NotFoundGroups = 'Groups not found',
  NotAddedUsersToGroup = 'Not added users to group',
}
