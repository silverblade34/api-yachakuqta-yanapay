import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from '../users/schema/users.schema';
import { Students, StudentsSchema } from './schema/students.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema
      },
      {
        name: Students.name,
        schema: StudentsSchema
      }
    ])
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule { }
