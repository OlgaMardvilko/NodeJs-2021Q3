export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface IGroupBase {
  name: string;
  permission: Permission[];
}

export interface IGroup extends IGroupBase {
  id: string;
}
