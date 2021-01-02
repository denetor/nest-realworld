import { ApiProperty } from '@nestjs/swagger';

export class UserResetPasswordDto {
    @ApiProperty({type: String})
    password: string;

    @ApiProperty({type: String})
    token: string;
}

