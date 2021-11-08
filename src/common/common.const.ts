export enum ResponseCode {
  Success = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  ServiceError = 500,
}

export enum ResponseMessage {
  HomePageSuccess = 'Hello World!',
  NotFoundUser = 'User not found',
  NotFoundUsers = 'Users not found',
}
