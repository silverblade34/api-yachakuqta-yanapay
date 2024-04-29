import { MiddlewareConsumer, Module } from '@nestjs/common';
import { StudentsModule } from './modules/students/students.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { AdministratorsModule } from './modules/administrators/administrators.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { AnswersModule } from './modules/answers/answers.module';
import { ChallengesModule } from './modules/challenges/challenges.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { ResponseMiddleware } from './middlewares/response.middleware';
import { SyllabusModule } from './modules/syllabus/syllabus.module';

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
    ChallengesModule,
    UsersModule,
    SyllabusModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseMiddleware).forRoutes('*');
  }
}
