import { Module } from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { AdministratorsController } from './administrators.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Administrators, AdministratorsSchema } from './schema/administrators.schema';
import { Users, UsersSchema } from '../users/schema/users.schema';

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
  controllers: [AdministratorsController],
  providers: [AdministratorsService],
})
export class AdministratorsModule { }
