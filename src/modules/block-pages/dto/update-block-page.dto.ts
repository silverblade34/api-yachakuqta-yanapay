import { PartialType } from '@nestjs/mapped-types';
import { CreateBlockPageDto } from './create-block-page.dto';

export class UpdateBlockPageDto extends PartialType(CreateBlockPageDto) {}
