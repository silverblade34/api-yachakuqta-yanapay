import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from '../users/schema/users.schema';
import { Model } from 'mongoose';
import { compare } from 'bcrypt';
import { PayloadUser } from './interfaces/auth.interface';
import { JwtService } from '@nestjs/jwt';
import { Administrators, AdministratorsDocument } from '../administrators/schema/administrators.schema';
import { Students, StudentsDocument } from '../students/schema/students.schema';
import { Teachers, TeachersDocument } from '../teachers/schema/teachers.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private usersModule: Model<UsersDocument>,
    @InjectModel(Administrators.name) private administratorsModule: Model<AdministratorsDocument>,
    @InjectModel(Teachers.name) private teachersModule: Model<TeachersDocument>,
    @InjectModel(Students.name) private studentsModule: Model<StudentsDocument>,
    private jwtService: JwtService,
  ) { }

  async login(loginAuthDto: LoginAuthDto) {
    const findUser = await this.usersModule.findOne({ username: loginAuthDto.username })
    if (!findUser) { throw new HttpException(`El usuario no se encuentra registrado!`, 404); }

    const checkPassword = await compare(loginAuthDto.password, findUser.password)

    if (!checkPassword) { throw new HttpException(`La contraseña es incorrecta!`, 404); }

    let name: string = ""

    if (findUser.rol == "ADMINISTRATOR") {
      const findAdministrator = await this.administratorsModule.findOne({ userId: findUser._id })
      name = findAdministrator.name + " " + findAdministrator.lastName
    } else if (findUser.rol == "TEACHER") {
      const findTeacher = await this.teachersModule.findOne({ userId: findUser._id })
      name = findTeacher.name + " " + findTeacher.lastName
    } else {
      const findStudent = await this.studentsModule.findOne({ userId: findUser._id })
      name = findStudent.name + " " + findStudent.lastName
    }

    const payload: PayloadUser = { userId: findUser._id.toString(), username: findUser.username, name, role: findUser.rol }

    const token = this.jwtService.sign(payload)
    const data = { token, username: findUser.username, role: findUser.rol, name }
    return data
  }
}
