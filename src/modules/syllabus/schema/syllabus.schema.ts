import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type SyllabusDocument = Syllabus & Document;

@Schema()
export class Syllabus {
    @Prop({ required: true })
    title: String

    @Prop({ required: true })
    description: String

    @Prop({ required: true })
    order: Number

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Courses' })
    courseId: mongoose.Types.ObjectId;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const SyllabusSchema = SchemaFactory.createForClass(Syllabus)