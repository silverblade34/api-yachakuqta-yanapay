import { Module } from '@nestjs/common';
import { StudentsModule } from './modules/students/students.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { AdministratorsModule } from './modules/administrators/administrators.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { AnswersModule } from './modules/answers/answers.module';
import { ChallengesModule } from './modules/challenges/challenges.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017") ,StudentsModule, TeachersModule, AdministratorsModule, QuestionsModule, AnswersModule, ChallengesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
