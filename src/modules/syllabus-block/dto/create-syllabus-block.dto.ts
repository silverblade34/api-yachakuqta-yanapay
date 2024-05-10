import { IsNotEmpty } from "class-validator"

export class CreateSyllabusBlockDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    order: number

    @IsNotEmpty()
    syllabusId: string
}
