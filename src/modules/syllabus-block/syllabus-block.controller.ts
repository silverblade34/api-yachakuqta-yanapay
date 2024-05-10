import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { SyllabusBlockService } from './syllabus-block.service';
import { CreateSyllabusBlockDto } from './dto/create-syllabus-block.dto';
import { UpdateSyllabusBlockDto } from './dto/update-syllabus-block.dto';
import { AdminAuthGuard, JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Response } from 'express';

@Controller('syllabus-block')
export class SyllabusBlockController {
  constructor(private readonly syllabusBlockService: SyllabusBlockService) { }

  @Post()
  @UseGuards(AdminAuthGuard)
  async create(@Body() createSyllabusBlockDto: CreateSyllabusBlockDto, @Res() res: Response) {
    try {
      const data = await this.syllabusBlockService.create(createSyllabusBlockDto);
      res.locals.response("Se ha creado el bloque de syllabus correctamente", data, true, 200);
    } catch (error) {
      res.locals.response(error.message, null, false, 400);
    }
  }

  @Get('/findAllToSyllabus/:syllabusId')
  @UseGuards(JwtAuthGuard)
  async findAllToSyllabus(@Param('syllabusId') syllabusId: string, @Res() res: Response) {
    try {
      const data = await this.syllabusBlockService.findAllToSyllabus(syllabusId);
      res.locals.response("Se esta listando los syllabus-block relacionados al Syllabus", data, true, 200);
    } catch (error) {
      res.locals.response(error.message, null, false, 400);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSyllabusBlockDto: UpdateSyllabusBlockDto) {
    return this.syllabusBlockService.update(+id, updateSyllabusBlockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.syllabusBlockService.remove(+id);
  }
}
