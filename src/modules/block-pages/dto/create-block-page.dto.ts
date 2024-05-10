import { IsNotEmpty } from "class-validator"

export class CreateBlockPageDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    page: number

    @IsNotEmpty()
    delta: any[]

    @IsNotEmpty()
    syllabusBlockId: string;
}
