import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UsersDocument = Users & Document;

@Schema()
export class Users {
    @Prop({ required: true, unique: true })
    username: string

    @Prop({ required: true })
    password: string

    @Prop({ required: true, enum: ["STUDENT", "TEACHER", "ADMINISTRATOR"] })
    rol: string
}

export const UsersSchema = SchemaFactory.createForClass(Users)