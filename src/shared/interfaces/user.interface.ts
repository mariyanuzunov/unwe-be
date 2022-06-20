// import { Document } from 'mongoose';
import { UserDocument } from '../../user/schemas/user.schema';
export interface IUser extends UserDocument {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly role: string;
}
