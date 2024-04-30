import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CoursesDocument = Courses & Document;

@Schema()
export class Courses {
    @Prop({ required: true })
    title: string

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const CoursesSchema = SchemaFactory.createForClass(Courses)