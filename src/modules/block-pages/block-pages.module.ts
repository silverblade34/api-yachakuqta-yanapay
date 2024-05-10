import { Module } from '@nestjs/common';
import { BlockPagesService } from './block-pages.service';
import { BlockPagesController } from './block-pages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlockPage, BlockPageSchema } from './schema/block-page.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BlockPage.name,
        schema: BlockPageSchema
      },
    ])
  ],
  controllers: [BlockPagesController],
  providers: [BlockPagesService],
})
export class BlockPagesModule { }
