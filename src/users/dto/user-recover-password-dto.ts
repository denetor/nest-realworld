import {ApiProperty} from '@nestjs/swagger';

export class UserRecoverPasswordDto {
    @ApiProperty({type: String})
    email: string;
}
