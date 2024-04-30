import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('administrators')
export class AdministratorsController {
  constructor(private readonly administratorsService: AdministratorsService) { }

  @Post()
  async create(@Body() createAdministratorDto: CreateAdministratorDto, @Res() res: Response) {
    try {
      const data = await this.administratorsService.create(createAdministratorDto);
      res.locals.response("Se ha creado el administrador correctamente", data, true, 200);
    } catch (error) {
      res.locals.response(error.message, null, false, 400);
    }
  }

  @Get()
  findAll() {
    return this.administratorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administratorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdministratorDto: UpdateAdministratorDto) {
    return this.administratorsService.update(+id, updateAdministratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administratorsService.remove(+id);
  }
}
