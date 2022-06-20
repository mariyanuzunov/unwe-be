import { Module } from '@nestjs/common';
import { DoorsService } from './doors.service';
import { DoorsController } from './doors.controller';
import { DoorSchema, Door } from './schemas/door.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Door.name, schema: DoorSchema }]),
    AuthModule,
    UserModule,
  ],
  controllers: [DoorsController],
  providers: [DoorsService],
})
export class DoorsModule {}
