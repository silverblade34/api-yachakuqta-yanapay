import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type TeachersDocument = Teachers & Document;

@Schema()
export class Teachers {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    lastName: string

    @Prop({ required: true, unique: true })
    dni: string

    @Prop({ required: true })
    email: string

    @Prop({ required: true })
    nroCPPe: string

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
    userId: mongoose.Types.ObjectId;
}

export const TeachersSchema = SchemaFactory.createForClass(Teachers)