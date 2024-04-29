import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Model } from 'mongoose';
import { Questions, QuestionsDocument } from './schema/questions.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Teachers, TeachersDocument } from '../teachers/schema/teachers.schema';
import { Syllabus, SyllabusDocument } from '../syllabus/schema/syllabus.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Questions.name) private questionsModule: Model<QuestionsDocument>,
    @InjectModel(Teachers.name) private teachersModule: Model<TeachersDocument>,
    @InjectModel(Syllabus.name) private syllabusModule: Model<SyllabusDocument>,
  ) { }

  async create(createQuestionDto: CreateQuestionDto) {
    const [findSyllabus, findTeacher] = await Promise.all([
      this.syllabusModule.findOne({ _id: createQuestionDto.syllabusId }),
      this.teachersModule.findOne({ _id: createQuestionDto.teacherId })
    ])

    if (!findSyllabus) { throw new BadRequestException(`El syllabus con id: ${createQuestionDto.syllabusId} no se encuentra registrado`) }
    if (!findTeacher) { throw new BadRequestException(`El profesor con id: ${createQuestionDto.teacherId} no se encuentra registrado`) }

    const newQuestion = await this.questionsModule.create(createQuestionDto)
    return newQuestion;
  }

  findAll() {
    return `This action returns all questions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
