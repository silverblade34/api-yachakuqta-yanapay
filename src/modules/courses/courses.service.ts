import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Courses, CoursesDocument } from './schema/courses.schema';
import { Model } from 'mongoose';
import { Syllabus, SyllabusDocument } from '../syllabus/schema/syllabus.schema';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Courses.name) private coursesModule: Model<CoursesDocument>,
    @InjectModel(Syllabus.name) private syllabusModule: Model<SyllabusDocument>,
  ) { }

  async create(createCourseDto: CreateCourseDto, icon: any) {
    const validExtensions = ['.png'];
    const ext = path.extname(icon[0].originalname).toLowerCase();

    if (!validExtensions.includes(ext)) {
      throw new BadRequestException('El icono debe ser de formato PNG');
    }

    const nameImageSave = await this.uploadImageDirectory(icon[0], "");

    const newCourse = {
      "title": createCourseDto.title,
      "imageIcon": nameImageSave,
      "imageBackground": ""
    }
    const createdCourse = await this.coursesModule.create(newCourse)
    return createdCourse;
  }

  async findAll() {
    const findCourses = await this.coursesModule.find()
    return findCourses;
  }


  async findAllToSyllabus() {
    // Realiza la consulta utilizando agregación
    const coursesWithSyllabus = await this.coursesModule.aggregate([
      {
        $lookup: {
          from: 'syllabuses',
          localField: '_id',
          foreignField: 'courseId',
          as: 'syllabuses',
        },
      },
      {
        $addFields: {
          totalSyllabus: { $size: '$syllabuses' },
        },
      },
    ]);

    return coursesWithSyllabus;
  }


  async submitImage(idCourse: string, image: any) {
    if (!image || image.length === 0) {
      throw new BadRequestException('No se ha detectado ninguna imagen');
    }

    const findCourse = await this.coursesModule.findOne({ _id: idCourse });
    if (!findCourse) {
      throw new BadRequestException('El curso referenciado no se encuentra registrado');
    }

    const validExtensions = ['.png'];
    const ext = path.extname(image[0].originalname).toLowerCase();

    if (!validExtensions.includes(ext)) {
      throw new BadRequestException('La imagen debe ser de formato PNG');
    }

    const nameImageSave = await this.uploadImageDirectory(image[0], findCourse.imageIcon);
    await this.coursesModule.updateOne(
      { _id: idCourse },
      { $set: { imageBackground: nameImageSave } },
    );
  }

  async uploadImageDirectory(image: any, nameImageExisting: string): Promise<string> {
    if (!image) {
      throw new Error('No se ha proporcionado una imagen');
    }
    const uploadPath = process.env.IMAGES_DIRECTORY;

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const nameFile = image.originalname.split('.');
    const fileName = `${uuidv4()}.${nameFile[nameFile.length - 1]}`;

    const filePath = path.join(uploadPath, fileName);
    fs.writeFileSync(filePath, image.buffer);

    if (nameImageExisting) {
      const existingFilePath = path.join(uploadPath, nameImageExisting);
      if (fs.existsSync(existingFilePath)) {
        fs.unlinkSync(existingFilePath);
      }
    }

    return fileName;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  async update(image: any, updateCourseDto: UpdateCourseDto) {
    const findCourse = await this.coursesModule.findOne({ _id: updateCourseDto.idCourse });
    if (!findCourse) {
      throw new BadRequestException('El curso referenciado no se encuentra registrado');
    }

    if (image != "") {
      const validExtensions = ['.png'];
      const ext = path.extname(image[0].originalname).toLowerCase();

      if (!validExtensions.includes(ext)) {
        throw new BadRequestException('La imagen debe ser de formato PNG');
      }

      const nameImageSave = await this.uploadImageDirectory(image[0], findCourse.imageIcon);

      await this.coursesModule.updateOne({ _id: updateCourseDto.idCourse }, { $set: { imageIcon: nameImageSave, title: updateCourseDto.title } });

    } else {
      await this.coursesModule.updateOne({ _id: updateCourseDto.idCourse }, { $set: { title: updateCourseDto.title } });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
