import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Courses, CoursesSchema } from './schema/courses.schema';
import { Syllabus, SyllabusSchema } from '../syllabus/schema/syllabus.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Courses.name,
        schema: CoursesSchema
      },
      {
        name: Syllabus.name,
        schema: SyllabusSchema
      }
    ])
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule { }
