import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type AdministratorsDocument = Administrators & Document;

@Schema()
export class Administrators {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    lastName: string

    @Prop({ required: true, unique: true })
    dni: string

    @Prop({ required: true })
    email: string

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
    userId: mongoose.Types.ObjectId;
}

export const AdministratorsSchema = SchemaFactory.createForClass(Administrators)