import {ApiProperty} from "@nestjs/swagger";

export class CreateProjectDto {
    @ApiProperty({type: String})
    name: string;
}
