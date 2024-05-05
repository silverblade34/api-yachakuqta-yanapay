import { IsNotEmpty } from "class-validator";

export class SubmitImageCourseDto {
    @IsNotEmpty()
    idCourse: string
}
