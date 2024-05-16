import { IsNotEmpty } from "class-validator"

export class CreateBlockPageDto {
    @IsNotEmpty()
    page: number

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    syllabusBlockId: string;

    blocks: BlockDto[]
}

export class BlockDto {
    @IsNotEmpty()
    order: number

    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    type: string

    @IsNotEmpty()
    base64: string

    @IsNotEmpty()
    nameImage: string

    details: DetailsBlockDto
}


export class DetailsBlockDto {
    @IsNotEmpty()
    height: number

    @IsNotEmpty()
    width: number
}