import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Teachers, TeachersDocument } from './schema/teachers.schema';
import { Users, UsersDocument } from '../users/schema/users.schema';
import mongoose, { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { CppeProvider } from 'src/providers/cppe.provider';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Users.name) private usersModule: Model<UsersDocument>,
    @InjectModel(Teachers.name) private teachersModule: Model<TeachersDocument>,
    private cppeProvider: CppeProvider,
  ) { }

  async create(createTeacherDto: CreateTeacherDto) {
    const [findUser, findAdministrator, findTeacherCppe] = await Promise.all([
      this.usersModule.findOne({ username: createTeacherDto.username }),
      this.teachersModule.findOne({ dni: createTeacherDto.dni }),
      this.cppeProvider.searchTeacherDNI(createTeacherDto.dni)
    ])

    if (!findTeacherCppe) {
      throw new BadRequestException(`El profesor con DNI: ${createTeacherDto.dni} no se encuentra registrado en el colegio de profesores del Perú`)
    }

    if (findUser) {
      throw new BadRequestException(`Ya existe una cuenta registrada con el usuario: ${createTeacherDto.username}`)
    }

    if (findAdministrator) {
      throw new BadRequestException(`Ya existe un profesor registrado con el dni: ${createTeacherDto.dni}`)
    }

    const createUser: Users = {
      username: createTeacherDto.username,
      password: await hash(createTeacherDto.password, 10),
      rol: "TEACHER",
    };
    const userCreated = await this.usersModule.create(createUser);

    const createTeacher: Teachers = {
      userId: new mongoose.Types.ObjectId(userCreated._id),
      name: createTeacherDto.name,
      lastName: createTeacherDto.lastName,
      dni: createTeacherDto.dni,
      email: createTeacherDto.email,
      nroCPPe: findTeacherCppe.aaData[0][8]
    };

    const createdTeacher = await this.teachersModule.create(createTeacher);
    return createdTeacher;
  }

  findAll() {
    return `This action returns all teachers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
