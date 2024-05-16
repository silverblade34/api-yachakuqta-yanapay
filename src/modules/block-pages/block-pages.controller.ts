import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { BlockPagesService } from './block-pages.service';
import { CreateBlockPageDto } from './dto/create-block-page.dto';
import { UpdateBlockPageDto } from './dto/update-block-page.dto';
import { AdminAuthGuard, JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Response } from 'express';

@Controller('block-pages')
export class BlockPagesController {
  constructor(private readonly blockPagesService: BlockPagesService) { }

  @Post()
  @UseGuards(AdminAuthGuard)
  async create(@Body() createBlockPageDto: CreateBlockPageDto, @Res() res: Response) {
    try {
      const data = await this.blockPagesService.create(createBlockPageDto);
      res.locals.response("Se ha creado la pagina para el bloque de syllabus", data, true, 200);
    } catch (error) {
      console.log(error)
      res.locals.response(error.message, null, false, 400);
    }
  }

  @Get('/findAllToSyllabusBlock/:syllabusBlockId')
  @UseGuards(JwtAuthGuard)
  async findAllToSyllabusBlock(@Param('syllabusBlockId') syllabusBlockId: string, @Res() res: Response) {
    try {
      const data = await this.blockPagesService.findAllToSyllabusBlock(syllabusBlockId);
      res.locals.response("Lista de block-pages que pertenecen al syllabus-block", data, true, 200);
    } catch (error) {
      res.locals.response(error.message, null, false, 400);
    }
  }

  @Get('/:blockPageId')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('blockPageId') blockPageId: string, @Res() res: Response) {
    try {
      const data = await this.blockPagesService.findOne(blockPageId);
      res.locals.response("El block-page se ha encontrado", data, true, 200);
    } catch (error) {
      res.locals.response(error.message, null, false, 400);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlockPageDto: UpdateBlockPageDto) {
    return this.blockPagesService.update(+id, updateBlockPageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blockPagesService.remove(+id);
  }
}
