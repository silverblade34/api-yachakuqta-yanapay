import { IsNotEmpty, IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class QuestionOptionDto {
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    status: boolean;
}

export class CreateQuestionDto {
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    image: string;

    @IsNotEmpty()
    syllabusId: string;

    @IsNotEmpty()
    teacherId: string;

    @IsArray()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => QuestionOptionDto)
    options: QuestionOptionDto[];
}
