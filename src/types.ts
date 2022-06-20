import { IUser } from './shared/interfaces/user.interface';

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
