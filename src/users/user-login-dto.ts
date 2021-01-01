import {ApiProperty} from '@nestjs/swagger';

export class UserLoginDto {
    @ApiProperty({type: String})
    email: string;

    @ApiProperty({type: String})
    password: string;
}
