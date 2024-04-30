import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type StudentsDocument = Students & Document;

@Schema()
export class Students {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    lastName: string

    @Prop({ required: true, unique: true })
    dni: string

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
    userId: mongoose.Types.ObjectId;
}

export const StudentsSchema = SchemaFactory.createForClass(Students)