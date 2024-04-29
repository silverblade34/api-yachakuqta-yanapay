import { IsNotEmpty } from "class-validator";

export class CreateStudentDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    lastName: string

    @IsNotEmpty()
    dni: string

    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string
}
