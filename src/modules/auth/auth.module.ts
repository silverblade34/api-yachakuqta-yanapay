import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from '../users/schema/users.schema';
import { Administrators, AdministratorsSchema } from '../administrators/schema/administrators.schema';
import { Teachers, TeachersSchema } from '../teachers/schema/teachers.schema';
import { Students, StudentsSchema } from '../students/schema/students.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule, 
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema
      },
      {
        name: Administrators.name,
        schema: AdministratorsSchema
      },
      {
        name: Teachers.name,
        schema: TeachersSchema
      },
      {
        name: Students.name,
        schema: StudentsSchema
      }
    ]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '10h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
