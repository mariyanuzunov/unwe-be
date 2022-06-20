import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { IUser } from '../shared/interfaces/user.interface';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userData: RegisterUserDto) {
    const exists = await this.getUserByEmail(userData.email);
    if (exists) {
      throw new BadRequestException(
        'A user with this e-mail address already exists.',
      );
    }

    const user = new this.userModel(userData);
    return user.save();
  }

  async getUserByEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({ email }).exec();
  }

  async getUserById(id: string): Promise<IUser> {
    return this.userModel.findById(id, { password: 0 }).exec();
  }
}
