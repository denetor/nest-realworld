import {ApiProperty} from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({type: Number})
    id: number;

    @ApiProperty({type: String})
    name: string;

    @ApiProperty({type: String})
    lastName: string;

    @ApiProperty({type: String})
    email: string;

    @ApiProperty({type: String})
    password: string;

    @ApiProperty({type: Boolean, description: 'If true, user must change password, after login' })
    mustChangePassword: boolean;

    @ApiProperty({type: Boolean, description: 'Accepted consent to use personal data to use the system' })
    technicalConsent: boolean;

    @ApiProperty({type: Boolean, description: 'If true, user is system administrator' })
    isAdmin: boolean;

    // @ApiProperty({type: Number})
    // appRoleId!: number;
}
