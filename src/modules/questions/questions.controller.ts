import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Request } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Request as ExpressRequest } from 'express';
import { Response } from 'express';
import { TeacherAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) { }

  @Post()
  @UseGuards(TeacherAuthGuard)
  async create(@Body() createQuestionDto: CreateQuestionDto, @Request() req: ExpressRequest, @Res() res: Response) {

    try {
      const data = await this.questionsService.create(createQuestionDto, req.user["roleId"]);
      res.locals.response("Se ha creado la pregunta correctamente", data, true, 200);
    } catch (error) {
      res.locals.response(error.message, null, false, 400);
    }
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
