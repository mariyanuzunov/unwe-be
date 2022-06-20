import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDoorDto } from './dto/create-door.dto';
import { UpdateDoorDto } from './dto/update-door.dto';
import { Door, DoorDocument } from './schemas/door.schema';

@Injectable()
export class DoorsService {
  constructor(@InjectModel(Door.name) private doorModel: Model<DoorDocument>) {}

  async createDoor(data: CreateDoorDto) {
    const door = new this.doorModel(data);
    return door.save();
  }

  async getAllDoors() {
    return this.doorModel.find({}).sort({ createdAt: -1 }).exec();
  }

  async getDoorById(id: string) {
    return this.doorModel.findById(id).exec();
  }

  async updateDoor(id: string, updateDoorDto: UpdateDoorDto) {
    return this.doorModel
      .findByIdAndUpdate(id, updateDoorDto, {
        useFindAndModify: false,
        returnOriginal: false,
      })
      .exec();
  }

  async deleteDoor(id: string) {
    return this.doorModel.findByIdAndDelete(id).exec();
  }
}
