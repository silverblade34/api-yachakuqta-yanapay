import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AdminAuthGuard, JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Response } from 'express';
import { SubmitImageCourseDto } from './dto/submit-image-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Post()
  @UseGuards(AdminAuthGuard)
  async create(@Body() createCourseDto: CreateCourseDto, @Res() res: Response) {
    try {
      const data = await this.coursesService.create(createCourseDto);
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

  @Post('/submitImage')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('image'))
  async submitImage(@UploadedFiles() image, @Body() submitImageCourseDto: SubmitImageCourseDto, @Res() res: Response) {
    try {
      const data = await this.coursesService.submitImage(submitImageCourseDto.idCourse, image);
      res.locals.response("Se ha asignado una imagen al curso correctamente", data, true, 200);
    } catch (error) {
      res.locals.response(error.message, null, false, 400);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
