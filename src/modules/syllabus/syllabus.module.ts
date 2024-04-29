import { Module } from '@nestjs/common';
import { SyllabusService } from './syllabus.service';
import { SyllabusController } from './syllabus.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Syllabus, SyllabusSchema } from './schema/syllabus.schema'
import { Courses, CoursesSchema } from '../courses/schema/courses.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Syllabus.name,
        schema: SyllabusSchema
      },
      {
        name: Courses.name,
        schema: CoursesSchema
      }
    ])
  ],
  controllers: [SyllabusController],
  providers: [SyllabusService],
})
export class SyllabusModule { }
