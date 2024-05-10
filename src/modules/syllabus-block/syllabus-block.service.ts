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

    // Realizar la agregación para obtener los SyllabusBlocks con los títulos de los BlockPage
    const syllabusBlocks = await this.syllabusBlockModule.aggregate([
      { $match: { syllabusId: findSyllabus._id } }, // Filtrar por el syllabusId
      {
        $lookup: {
          from: 'blockpages', // Nombre de la colección de BlockPage
          localField: '_id',
          foreignField: 'syllabusBlockId',
          as: 'blockPages',
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          order: 1,
          syllabusId: 1,
          createdAt: 1,
          blockPages: {
            $map: {
              input: '$blockPages',
              as: 'block',
              in: {
                _id: '$$block._id',
                title: '$$block.title',
              },
            },
          },
        },
      },
    ]);

    return syllabusBlocks;
  }

  update(id: number, updateSyllabusBlockDto: UpdateSyllabusBlockDto) {
    return `This action updates a #${id} syllabusBlock`;
  }

  remove(id: number) {
    return `This action removes a #${id} syllabusBlock`;
  }
}
