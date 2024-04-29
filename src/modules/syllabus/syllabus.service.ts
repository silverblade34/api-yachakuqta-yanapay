import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSyllabusDto } from './dto/create-syllabus.dto';
import { UpdateSyllabusDto } from './dto/update-syllabus.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Syllabus, SyllabusDocument } from './schema/syllabus.schema';
import mongoose, { Model } from 'mongoose';
import { Courses, CoursesDocument } from '../courses/schema/courses.schema';

@Injectable()
export class SyllabusService {
  constructor(
    @InjectModel(Syllabus.name) private syllabusModule: Model<SyllabusDocument>,
    @InjectModel(Courses.name) private coursesModule: Model<CoursesDocument>
  ) { }

  async create(createSyllabusDto: CreateSyllabusDto) {
    const findCourse = await this.coursesModule.findOne({ _id: createSyllabusDto.courseId })

    if (!findCourse) { throw new BadRequestException(`El curso con id: ${createSyllabusDto.courseId} no se encuentra registrado`) }

    const newSyllabus = {
      title: createSyllabusDto.title,
      description: createSyllabusDto.description,
      order: createSyllabusDto.order,
      courseId: new mongoose.Types.ObjectId(createSyllabusDto.courseId),
    }
    const createdSyllabus = await this.syllabusModule.create(newSyllabus)
    return createdSyllabus;
  }

  async findAll() {
    const findSyllabus = await this.syllabusModule.find().populate('courseId');
    return findSyllabus;
  }

  async findAllToCourse(courseId: string) {
    const findCourse = await this.coursesModule.findOne({ _id: courseId })

    if (!findCourse) { throw new BadRequestException(`El curso con id: ${courseId} no se encuentra registrado`) }

    const findSyllabus = await this.syllabusModule.find({ courseId });
    return findSyllabus;
  }

  findOne(id: number) {
    return `This action returns a #${id} syllabus`;
  }

  update(id: number, updateSyllabusDto: UpdateSyllabusDto) {
    return `This action updates a #${id} syllabus`;
  }

  remove(id: number) {
    return `This action removes a #${id} syllabus`;
  }
}
