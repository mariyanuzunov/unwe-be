import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/shared/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(credentials: LoginCredentialsDto): Promise<IUser> {
    try {
      const user: IUser = await this.userService.getUserByEmail(
        credentials.email,
      );
      const isValid = await bcrypt.compare(credentials.password, user.password);

      if (user && isValid) {
        return user;
      }
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid e-mail or password.');
    }

    return null;
  }

  async login(user: IUser) {
    const accessToken = this.jwtService.sign({
      id: user._id,
      email: user.email,
    });

    return {
      _id: user._id,
      role: user.role,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      purcases: user.purchases,
      accessToken,
    };
  }

  async register(userData: RegisterUserDto) {
    try {
      userData.password = await bcrypt.hash(userData.password, 10);
      return await this.userService.create(userData);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async getProfile(userId: string) {
    return this.userService.getUserById(userId);
  }
}
