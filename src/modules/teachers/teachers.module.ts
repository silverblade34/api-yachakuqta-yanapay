import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Teachers, TeachersSchema } from './schema/teachers.schema';
import { Users, UsersSchema } from '../users/schema/users.schema';
import { CppeProvider } from 'src/providers/cppe.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema
      },
      {
        name: Teachers.name,
        schema: TeachersSchema
      }
    ])
  ],
  controllers: [TeachersController],
  providers: [TeachersService, CppeProvider],
})
export class TeachersModule { }
