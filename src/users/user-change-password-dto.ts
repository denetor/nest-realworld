import { ApiProperty } from '@nestjs/swagger';

export class UserChangePasswordDto {
    @ApiProperty({type: String})
    oldPassword: string;

    @ApiProperty({type: String})
    newPassword: string;
}

