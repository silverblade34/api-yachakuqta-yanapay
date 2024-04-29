import { IsNotEmpty } from "class-validator";

export class CreateTeacherDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    lastName: string

    @IsNotEmpty()
    dni: string

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string
}
