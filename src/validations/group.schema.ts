import Joi from '@hapi/joi';
import { Permission } from 'models/group.interface';

const validPermissions: Permission[] = ['DELETE', 'WRITE', 'READ', 'SHARE', 'UPLOAD_FILES'];

export const groupValidationSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().required(),
  permission: Joi.array()
    .items(Joi.string().valid(...validPermissions))
    .required(),
});
