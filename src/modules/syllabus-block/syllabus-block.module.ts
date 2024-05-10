import { Module } from '@nestjs/common';
import { SyllabusBlockService } from './syllabus-block.service';
import { SyllabusBlockController } from './syllabus-block.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SyllabusBlock, SyllabusBlockSchema } from './schema/syllabus-block.schema';
import { Syllabus, SyllabusSchema } from '../syllabus/schema/syllabus.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SyllabusBlock.name,
        schema: SyllabusBlockSchema
      },
      {
        name: Syllabus.name,
        schema: SyllabusSchema
      },
    ])
  ],
  controllers: [SyllabusBlockController],
  providers: [SyllabusBlockService],
})
export class SyllabusBlockModule {}
