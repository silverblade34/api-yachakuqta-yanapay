import { IsIn, IsNotEmpty } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    @IsIn(["STUDENT", "ADMINISTRATOR", "TEACHER"])
    rol: string
}
