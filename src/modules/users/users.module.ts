import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schema/users.schema';
import { Administrators, AdministratorsSchema } from '../administrators/schema/administrator.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema
      },
      {
        name: Administrators.name,
        schema: AdministratorsSchema
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
