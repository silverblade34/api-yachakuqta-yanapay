import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AdminAuthGuard, JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Response } from 'express';
import { SubmitImageCourseDto } from './dto/submit-image-course.dto';
import * as fs from 'fs';
import * as path from 'path';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  // Al crear un curso se debe subir un icono de card
  @Post()
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FilesInterceptor('image'))
  async create(@UploadedFiles() image: any, @Body() createCourseDto: CreateCourseDto, @Res() res: Response) {
    try {
      const data = await this.coursesService.create(createCourseDto, image);
      res.locals.response("Se ha creado el curso correctamente", data, true, 200);
    } catch (error) {
      res.locals.response(error.message, null, false, 400);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Res() res: Response) {
    try {
      const data = await this.coursesService.findAll();
      res.locals.response("Lista de cursos registrados", data, true, 200);
    } catch (error) {
      res.locals.response(error.message, null, false, 400);
    }
  }

  @Get('/findAllToSyllabus')
  @UseGuards(JwtAuthGuard)
  async findAllToSyllabus(@Res() res: Response) {
    try {
      const data = await this.coursesService.findAllToSyllabus();
      res.locals.response("Lista de cursos registrados y syllabus asignados", data, true, 200);
    } catch (error) {
      res.locals.response(error.message, null, false, 400);
    }
  }

  // Las imagenes son los fondos para la vista de detalles
  @Post('/submitImageBack')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('image'))
  async submitImage(@UploadedFiles() image: any, @Body() submitImageCourseDto: SubmitImageCourseDto, @Res() res: Response) {
    try {
      const data = await this.coursesService.submitImage(submitImageCourseDto.idCourse, image);
      res.locals.response("Se ha asignado una imagen al curso correctamente", data, true, 200);
    } catch (error) {
      res.locals.response(error.message, null, false, 400);
    }
  }

  @Get('/getImage/:fileName')
  getImage(@Param('fileName') fileName: string, @Res() res: Response) {
    const filePath = path.join(process.env.IMAGES_DIRECTORY, fileName);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send('File not found');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Post('/update')
  @UseInterceptors(FilesInterceptor('image'))
  async update(@UploadedFiles() image: any, @Body() updateCourseDto: UpdateCourseDto, @Res() res: Response) {
    try {
      const data = await this.coursesService.update(image, updateCourseDto);
      res.locals.response("Se ha actualizado correctamente el curso", data, true, 200);
    } catch (error) {
      res.locals.response(error.message, null, false, 400);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
