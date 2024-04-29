import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Questions, QuestionsSchema } from './schema/questions.schema';
import { Syllabus, SyllabusSchema } from '../syllabus/schema/syllabus.schema';
import { Teachers, TeachersSchema } from '../teachers/schema/teachers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Questions.name,
        schema: QuestionsSchema
      },
      {
        name: Syllabus.name,
        schema: SyllabusSchema
      },
      {
        name: Teachers.name,
        schema: TeachersSchema
      }
    ])
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule { }
