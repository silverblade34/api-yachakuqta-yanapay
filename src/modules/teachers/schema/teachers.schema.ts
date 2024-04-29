import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type TeachersDocument = Teachers & Document;

@Schema()
export class Teachers {
    @Prop({ required: true })
    name: String

    @Prop({ required: true })
    lastName: String

    @Prop({ required: true, unique: true })
    dni: String

    @Prop({ required: true })
    email: String

    @Prop({ required: true })
    nroCPPe: String

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
    userId: mongoose.Types.ObjectId;
}

export const TeachersSchema = SchemaFactory.createForClass(Teachers)