import { PartialType } from '@nestjs/mapped-types';
import { CreateSyllabusBlockDto } from './create-syllabus-block.dto';

export class UpdateSyllabusBlockDto extends PartialType(CreateSyllabusBlockDto) {}
