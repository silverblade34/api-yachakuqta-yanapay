import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Courses, CoursesDocument } from './schema/courses.schema';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Courses.name) private coursesModule: Model<CoursesDocument>
  ) { }

  async create(createCourseDto: CreateCourseDto) {
    const createdCourse = await this.coursesModule.create(createCourseDto)
    return createdCourse;
  }

  async findAll() {
    const findCourses = await this.coursesModule.find()
    return findCourses;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
