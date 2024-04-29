import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UsersDocument = Users & Document;

@Schema()
export class Users {
    @Prop({ required: true, unique: true })
    username: String

    @Prop({ required: true })
    password: String

    @Prop({ required: true, enum: ["STUDENT", "TEACHER", "ADMINISTRATOR"] })
    rol: String
}

export const UsersSchema = SchemaFactory.createForClass(Users)