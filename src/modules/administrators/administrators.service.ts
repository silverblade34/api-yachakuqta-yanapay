import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Administrators, AdministratorsDocument } from './schema/administrator.schema';
import mongoose, { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { Users, UsersDocument } from '../users/schema/users.schema';

@Injectable()
export class AdministratorsService {
  constructor(
    @InjectModel(Users.name) private usersModule: Model<UsersDocument>,
    @InjectModel(Administrators.name) private administratorsModule: Model<AdministratorsDocument>,
  ) { }

  async create(createAdministratorDto: CreateAdministratorDto) {
    const [findUser, findAdministrator] = await Promise.all([
      this.usersModule.findOne({ username: createAdministratorDto.username }),
      this.administratorsModule.findOne({ dni: createAdministratorDto.dni })
    ])

    if (findUser) {
      throw new BadRequestException(`Ya existe una cuenta registrada con el usuario: ${createAdministratorDto.username}`)
    }

    if (findAdministrator) {
      throw new BadRequestException(`Ya existe un administrador registrado con el dni: ${createAdministratorDto.dni}`)
    }

    const createUser: Users = {
      username: createAdministratorDto.username,
      password: await hash(createAdministratorDto.password, 10),
      rol: "ADMINISTRATOR",
    };
    const userCreated = await this.usersModule.create(createUser);

    const createAdministrator: Administrators = {
      userId: new mongoose.Types.ObjectId(userCreated._id),
      name: createAdministratorDto.name,
      lastName: createAdministratorDto.lastName,
      dni: createAdministratorDto.dni,
      email: createAdministratorDto.email,
    };

    const administratorCreated = await this.administratorsModule.create(createAdministrator);
    return administratorCreated;
  }


  async findAll() {
    const administratorsFindAll = await this.administratorsModule.find().populate('userId');
    return administratorsFindAll;
  }

  async findOne(id: string) {
    const findAdministrator = await this.administratorsModule.findOne({ _id: id })
    console.log(findAdministrator)
    return findAdministrator;
  }

  update(id: number, updateAdministratorDto: UpdateAdministratorDto) {
    return `This action updates a #${id} administrator`;
  }

  remove(id: number) {
    return `This action removes a #${id} administrator`;
  }
}
