import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type StudentsDocument = Students & Document;

@Schema()
export class Students {
    @Prop({ required: true })
    name: String

    @Prop({ required: true })
    lastName: String

    @Prop({ required: true, unique: true })
    dni: String

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
    userId: mongoose.Types.ObjectId;
}

export const StudentsSchema = SchemaFactory.createForClass(Students)