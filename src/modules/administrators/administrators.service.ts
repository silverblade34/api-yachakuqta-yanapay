import { Injectable } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Administrators, AdministratorsDocument } from './schema/administrator.schema';
import mongoose, { Model } from 'mongoose';
import { Users, UsersDocument } from '../users/schema/users.schema';

@Injectable()
export class AdministratorsService {
  constructor(
    @InjectModel(Users.name) private usersModule: Model<UsersDocument>,
    @InjectModel(Administrators.name) private administratorsModule: Model<AdministratorsDocument>,
  ) { }

  async create(createAdministratorDto: CreateAdministratorDto) {
    const createUser: Users = {
      username: createAdministratorDto.username,
      password: createAdministratorDto.password,
      rol: "ADMINISTRATOR",
    }
    const userCreated = await this.usersModule.create(createUser);
    const createAdministrator: Administrators = {
      userId: new mongoose.Types.ObjectId(userCreated._id),
      name: createAdministratorDto.name,
      lastName: createAdministratorDto.lastName,
      dni: createAdministratorDto.dni,
      email: createAdministratorDto.email
    }
    const administratorCreated = await this.administratorsModule.create(createAdministrator);
    return administratorCreated;
  }

  async findAll() {
    const administratorsFindAll = await this.administratorsModule.find().populate('userId');
    return administratorsFindAll;
  }

  findOne(id: number) {
    return `This action returns a #${id} administrator`;
  }

  update(id: number, updateAdministratorDto: UpdateAdministratorDto) {
    return `This action updates a #${id} administrator`;
  }

  remove(id: number) {
    return `This action removes a #${id} administrator`;
  }
}
