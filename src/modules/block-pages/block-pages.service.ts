import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBlockPageDto } from './dto/create-block-page.dto';
import { UpdateBlockPageDto } from './dto/update-block-page.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SyllabusBlock, SyllabusBlockDocument } from '../syllabus-block/schema/syllabus-block.schema';
import { Model } from 'mongoose';
import { BlockPage, BlockPageDocument } from './schema/block-page.schema';

@Injectable()
export class BlockPagesService {
  constructor(
    @InjectModel(SyllabusBlock.name) private syllabusBlockModule: Model<SyllabusBlockDocument>,
    @InjectModel(BlockPage.name) private blockPageModule: Model<BlockPageDocument>,
  ) { }

  async create(createBlockPageDto: CreateBlockPageDto) {
    const findSyllabusBlock = await this.syllabusBlockModule.findOne({ _id: createBlockPageDto.syllabusBlockId });

    if (!findSyllabusBlock) { throw new BadRequestException(`El syllabus-block con id: ${createBlockPageDto.syllabusBlockId} no se encuentra registrado`) }

    const createdBlockPage = await this.blockPageModule.create(createBlockPageDto)
    return createdBlockPage;
  }

  findAllToSyllabusBlock(syllabusBlockId: string) {
    return `This action returns all blockPages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blockPage`;
  }

  update(id: number, updateBlockPageDto: UpdateBlockPageDto) {
    return `This action updates a #${id} blockPage`;
  }

  remove(id: number) {
    return `This action removes a #${id} blockPage`;
  }
}
