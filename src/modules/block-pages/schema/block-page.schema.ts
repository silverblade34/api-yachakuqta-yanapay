import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type BlockPageDocument = BlockPage & Document;

@Schema()
export class BlockPage {
    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    content: string

    @Prop({ required: true })
    page: number

    @Prop({ required: true })
    delta: any[]

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SyllabusBlock' })
    syllabusBlockId: mongoose.Types.ObjectId;

    @Prop({ default: Date.now })
    createdAt: Date;
}


export const BlockPageSchema = SchemaFactory.createForClass(BlockPage)