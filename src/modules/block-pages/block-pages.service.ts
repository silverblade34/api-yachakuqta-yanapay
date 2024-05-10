import { Injectable } from '@nestjs/common';
import { CreateBlockPageDto } from './dto/create-block-page.dto';
import { UpdateBlockPageDto } from './dto/update-block-page.dto';

@Injectable()
export class BlockPagesService {
  create(createBlockPageDto: CreateBlockPageDto) {
    return 'This action adds a new blockPage';
  }

  findAll() {
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
