import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Users, UsersDocument } from '../users/schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Students, StudentsDocument } from './schema/students.schema';
import { hash } from 'bcrypt';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Users.name) private usersModule: Model<UsersDocument>,
    @InjectModel(Students.name) private studentsModule: Model<StudentsDocument>,
  ) { }

  async create(createStudentDto: CreateStudentDto) {
    const [findUser, findStudent] = await Promise.all([
      this.usersModule.findOne({ username: createStudentDto.username }),
      this.studentsModule.findOne({ dni: createStudentDto.dni })
    ])

    if (findUser) {
      throw new BadRequestException(`Ya existe una cuenta registrada con el usuario: ${createStudentDto.username}`)
    }

    if (findStudent) {
      throw new BadRequestException(`Ya existe un estudiante registrado con el dni: ${createStudentDto.dni}`)
    }

    const newUser: Users = {
      username: createStudentDto.username,
      password: await hash(createStudentDto.password, 10),
      rol: "STUDENT",
    };
    const userCreated = await this.usersModule.create(newUser);

    const newStudent = {
      userId: new mongoose.Types.ObjectId(userCreated._id),
      name: createStudentDto.name,
      lastName: createStudentDto.lastName,
      dni: createStudentDto.dni,
    };

    const createdStudent = await this.studentsModule.create(newStudent);
    return createdStudent;
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
