import { IsNotEmpty } from "class-validator"

export class CreateSyllabusDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    order: number

    @IsNotEmpty()
    courseId: string
}
