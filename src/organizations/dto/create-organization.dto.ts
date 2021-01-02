import {ApiProperty} from "@nestjs/swagger";

export class CreateOrganizationDto {
    @ApiProperty({type: String})
    name: string;
}
