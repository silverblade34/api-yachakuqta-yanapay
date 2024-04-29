import { Module } from '@nestjs/common';
import { StudentsModule } from './modules/students/students.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { AdministratorsModule } from './modules/administrators/administrators.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { AnswersModule } from './modules/answers/answers.module';
import { ChallengesModule } from './modules/challenges/challenges.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".dev.env",
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    StudentsModule,
    TeachersModule,
    AdministratorsModule,
    QuestionsModule,
    AnswersModule,
    ChallengesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
