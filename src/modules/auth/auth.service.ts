import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from '../users/schema/users.schema';
import { Model } from 'mongoose';
import { compare } from 'bcrypt';
import { PayloadUser } from './interfaces/auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private usersModule: Model<UsersDocument>,
    private jwtService: JwtService,
  ) { }

  async login(loginAuthDto: LoginAuthDto) {
    const findUser = await this.usersModule.findOne({ username: loginAuthDto.username })
    if (!findUser) { throw new HttpException(`El usuario no se encuentra registrado!`, 404); }
    console.log(findUser)
    const checkPassword = compare(loginAuthDto.password, findUser.password)
    if (!checkPassword) { throw new HttpException(`La contraseña es incorrecta!`, 404); }

    const payload: PayloadUser = { userId: findUser._id.toString(), username: findUser.username, name: "", role: findUser.rol }
    const token = this.jwtService.sign(payload)
    const data = { token, ...findUser }
    return data
  }
}
