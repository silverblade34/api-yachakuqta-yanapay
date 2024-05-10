import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSyllabusBlockDto } from './dto/create-syllabus-block.dto';
import { UpdateSyllabusBlockDto } from './dto/update-syllabus-block.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SyllabusBlock, SyllabusBlockDocument } from './schema/syllabus-block.schema';
import { Model } from 'mongoose';
import { Syllabus, SyllabusDocument } from '../syllabus/schema/syllabus.schema';

@Injectable()
export class SyllabusBlockService {
  constructor(
    @InjectModel(SyllabusBlock.name) private syllabusBlockModule: Model<SyllabusBlockDocument>,
    @InjectModel(Syllabus.name) private syllabusModule: Model<SyllabusDocument>,
  ) { }

  async create(createSyllabusBlockDto: CreateSyllabusBlockDto) {
    const findSyllabus = await this.syllabusModule.findOne({ _id: createSyllabusBlockDto.syllabusId });

    if (!findSyllabus) { throw new BadRequestException(`El syllabus con id: ${createSyllabusBlockDto.syllabusId} no se encuentra registrado`) }

    const createdQuestion = await this.syllabusBlockModule.create(createSyllabusBlockDto)
    return createdQuestion;
  }

  async findAllToSyllabus(syllabusId: string) {
    const findSyllabus = await this.syllabusModule.findOne({ _id: syllabusId })

    if (!findSyllabus) { throw new BadRequestException(`El syllabus con id: ${syllabusId} no se encuentra registrado`) }

    const findSyllabusBlocks = await this.syllabusBlockModule.find({ syllabusId });
    return findSyllabusBlocks;
  }

  update(id: number, updateSyllabusBlockDto: UpdateSyllabusBlockDto) {
    return `This action updates a #${id} syllabusBlock`;
  }

  remove(id: number) {
    return `This action removes a #${id} syllabusBlock`;
  }
}
