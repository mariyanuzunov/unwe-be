import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { Role } from 'src/auth/decorators/role.decorator';
import { DoorsService } from './doors.service';
import { CreateDoorDto } from './dto/create-door.dto';
import { UpdateDoorDto } from './dto/update-door.dto';

@Controller('doors')
export class DoorsController {
  constructor(private readonly doorsService: DoorsService) {}

  @Post()
  @Role('admin')
  async createOne(@Body() data: CreateDoorDto) {
    try {
      return await this.doorsService.createDoor(data);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  @Public()
  @Get()
  async getAll() {
    try {
      return await this.doorsService.getAllDoors();
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  @Public()
  @Get(':id')
  async getOne(@Param('id') id: string) {
    try {
      return await this.doorsService.getDoorById(id);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  @Patch(':id')
  @Role('admin')
  async updateOne(@Param('id') id: string, @Body() data: UpdateDoorDto) {
    try {
      return await this.doorsService.updateDoor(id, data);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  // TODO fix ngrx data
  @Put(':id')
  @Role('admin')
  async put(@Param('id') id: string, @Body() data: UpdateDoorDto) {
    try {
      return await this.doorsService.updateDoor(id, data);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  @Role('admin')
  async deleteOne(@Param('id') id: string) {
    try {
      return await this.doorsService.deleteDoor(id);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
