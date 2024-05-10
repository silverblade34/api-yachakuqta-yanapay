import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { BlockPage } from "src/modules/block-pages/schema/block-page.schema";

export type SyllabusBlockDocument = SyllabusBlock & Document;

@Schema()
export class SyllabusBlock {
    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    order: number

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Syllabus' })
    syllabusId: mongoose.Types.ObjectId;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const SyllabusBlockSchema = SchemaFactory.createForClass(SyllabusBlock)