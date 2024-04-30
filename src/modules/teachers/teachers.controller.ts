import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Response } from 'express';
import { TeacherAuthGuard } from '../auth/jwt/jwt-auth.guard';


@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) { }

  @Post()
  @UseGuards(TeacherAuthGuard)
  async create(@Body() createTeacherDto: CreateTeacherDto, @Res() res: Response) {
    try {
      const data = await this.teachersService.create(createTeacherDto);
      res.locals.response("Se ha creado el profesor correctamente", data, true, 200);
    } catch (error) {
      res.locals.response(error.message, null, false, 400);
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const data = await this.teachersService.findAll();
      res.locals.response("Lista de profesores registrados", data, true, 200);
    } catch (error) {
      res.locals.response(error.message, null, false, 400);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(+id);
  }
}
