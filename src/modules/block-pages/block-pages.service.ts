import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBlockPageDto } from './dto/create-block-page.dto';
import { UpdateBlockPageDto } from './dto/update-block-page.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SyllabusBlock, SyllabusBlockDocument } from '../syllabus-block/schema/syllabus-block.schema';
import { Model } from 'mongoose';
import { BlockPage, BlockPageDocument } from './schema/block-page.schema';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BlockPagesService {
  constructor(
    @InjectModel(SyllabusBlock.name) private syllabusBlockModule: Model<SyllabusBlockDocument>,
    @InjectModel(BlockPage.name) private blockPageModule: Model<BlockPageDocument>,
  ) { }

  async create(createBlockPageDto: CreateBlockPageDto) {
    const findSyllabusBlock = await this.syllabusBlockModule.findOne({ _id: createBlockPageDto.syllabusBlockId });

    if (!findSyllabusBlock) { throw new BadRequestException(`El syllabus-block con id: ${createBlockPageDto.syllabusBlockId} no se encuentra registrado`) }

    for (const block of createBlockPageDto.blocks) {
      if (block.type === 'IMAGEN' && block.base64) {
        const buffer = Buffer.from(block.base64, 'base64');
        const imageFileName = await this.uploadImageDirectory(buffer, "");
        block.nameImage = imageFileName;
        block.base64 = ""
      }
    }

    const createdBlockPage = await this.blockPageModule.create(createBlockPageDto)
    return createdBlockPage;
  }

  async uploadImageDirectory(buffer: any, nameImageExisting: string): Promise<string> {
    if (!buffer) {
      throw new Error('No se ha proporcionado una imagen');
    }
    const uploadPath = process.env.IMAGES_DIRECTORY;

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const fileName = `${uuidv4()}.jpg`;

    const filePath = path.join(uploadPath, fileName);
    fs.writeFileSync(filePath, buffer);

    if (nameImageExisting) {
      const existingFilePath = path.join(uploadPath, nameImageExisting);
      if (fs.existsSync(existingFilePath)) {
        fs.unlinkSync(existingFilePath);
      }
    }

    return fileName;
  }

  async findAllToSyllabusBlock(syllabusBlockId: string) {
    const findSyllabusBlock = await this.syllabusBlockModule.findOne({ _id: syllabusBlockId })

    if (!findSyllabusBlock) { throw new BadRequestException(`El syllabus-block con id: ${syllabusBlockId} no se encuentra registrado`) }

    const findBlockPages = await this.blockPageModule.find({ syllabusBlockId });
    return findBlockPages;
  }

  async findOne(blockPageId: string) {
    const findBlockPage = await this.blockPageModule.findOne({ _id: blockPageId })

    if (!findBlockPage) { throw new BadRequestException(`El block-page con id: ${blockPageId} no se encuentra registrado`) }
    return findBlockPage;
  }

  update(id: number, updateBlockPageDto: UpdateBlockPageDto) {
    return `This action updates a #${id} blockPage`;
  }

  remove(id: number) {
    return `This action removes a #${id} blockPage`;
  }
}
