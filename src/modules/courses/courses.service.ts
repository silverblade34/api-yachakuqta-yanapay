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

  async create(createCourseDto: CreateCourseDto) {
    const newCourse = {
      "title": createCourseDto.title,
      "image": ""
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
    const findCourse = await this.coursesModule.findOne({ _id: idCourse })
    if (!findCourse) {
      throw new BadRequestException('El curso referenciado no se encuentra registrado');
    }

    const nameImageSave = await this.uploadImageDirectory(image[0])
    await this.coursesModule.updateOne(
      { _id: idCourse },
      { $set: { image: nameImageSave } }, // Utiliza $set para actualizar solo el campo image
    );
  }


  async uploadImageDirectory(image: any): Promise<string> {
    if (!image) {
      throw new Error('No se ha proporcionado una imagen');
    }
    const uploadPath = process.env.IMAGES_DIRECTORY; // Directorio de carga de documentos

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Crea el directorio si no existe
    }

    const nameFile = image.originalname.split('.');
    const fileName = `${uuidv4()}.${nameFile[nameFile.length - 1]}`; // Genera un nombre aleatorio para el documento

    const filePath = path.join(uploadPath, fileName); // Ruta completa para guardar el archivo con el nuevo nombre
    fs.writeFileSync(filePath, image.buffer); // Guarda el archivo en la ruta especificada

    return fileName; // Devuelve el nombre del archivo como identificador único
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
