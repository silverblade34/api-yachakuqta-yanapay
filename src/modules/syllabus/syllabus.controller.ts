import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { SyllabusService } from './syllabus.service';
import { CreateSyllabusDto } from './dto/create-syllabus.dto';
import { UpdateSyllabusDto } from './dto/update-syllabus.dto';
import { Response } from 'express';

@Controller('syllabus')
export class SyllabusController {
  constructor(private readonly syllabusService: SyllabusService) { }

  @Post()
  async create(@Body() createSyllabusDto: CreateSyllabusDto, @Res() res: Response) {
    try {
      const data = await this.syllabusService.create(createSyllabusDto);
      res.locals.response("Se ha creado el temario/unidad correctamente", data, true, 200);
    } catch (error) {
      res.locals.response(error.message, null, false, 400);
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const data = await this.syllabusService.findAll();
      res.locals.response("Lista de syllabus registrados", data, true, 200);
    } catch (error) {
      res.locals.response(error.message, null, false, 400);
    }
  }

  @Get('findAllToCourse/:courseId')
  async findAllToCourse(@Param('courseId') courseId: string, @Res() res: Response) {
    try {
      const data = await this.syllabusService.findAllToCourse(courseId);
      res.locals.response("Lista de syllabus registrados", data, true, 200);
    } catch (error) {
      res.locals.response(error.message, null, false, 400);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.syllabusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSyllabusDto: UpdateSyllabusDto) {
    return this.syllabusService.update(+id, updateSyllabusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.syllabusService.remove(+id);
  }
}
