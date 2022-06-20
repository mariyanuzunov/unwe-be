import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('profile/:id')
  async getUser(@Param('id') id: string, @Req() req: Request) {
    if (id == req.user._id) {
      try {
        return await this.authService.getProfile(req.user._id);
      } catch (error) {
        console.error(error);
        throw new BadRequestException();
      }
    }

    throw new UnauthorizedException('Unauthorized!');
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: Request) {
    try {
      return await this.authService.login(req.user);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  @Public()
  @Post('/register')
  async register(@Body(ValidationPipe) userData: RegisterUserDto) {
    try {
      return await this.authService.register(userData);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
