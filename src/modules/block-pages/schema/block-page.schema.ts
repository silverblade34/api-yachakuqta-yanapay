import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type BlockPageDocument = BlockPage & Document;

@Schema()
export class Detail {
    @Prop({ required: false })
    width: number;

    @Prop({ required: false })
    height: number;
}

@Schema()
export class Block {
    @Prop({ required: true })
    order: number;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    type: string

    @Prop({ required: false })
    base64: string

    @Prop({ required: false })
    nameImage: string

    @Prop({ type: [Detail], default: [] })
    details: Detail[]
}

@Schema()
export class BlockPage {
    @Prop({ required: true })
    page: number

    @Prop({ required: true })
    title: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SyllabusBlock' })
    syllabusBlockId: mongoose.Types.ObjectId;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ type: [Block], default: [] })
    blocks: Block[];
}


export const BlockPageSchema = SchemaFactory.createForClass(BlockPage)