import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlockPagesService } from './block-pages.service';
import { CreateBlockPageDto } from './dto/create-block-page.dto';
import { UpdateBlockPageDto } from './dto/update-block-page.dto';

@Controller('block-pages')
export class BlockPagesController {
  constructor(private readonly blockPagesService: BlockPagesService) {}

  @Post()
  create(@Body() createBlockPageDto: CreateBlockPageDto) {
    return this.blockPagesService.create(createBlockPageDto);
  }

  @Get()
  findAll() {
    return this.blockPagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blockPagesService.findOne(+id);
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
