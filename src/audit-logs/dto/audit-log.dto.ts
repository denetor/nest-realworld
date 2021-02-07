import {ApiProperty} from "@nestjs/swagger";

export class AuditLogDto {
    @ApiProperty({type: String})
    entity?: string;

    @ApiProperty({type: String})
    operation?: string;

    @ApiProperty({type: String})
    oldData?: string;

    @ApiProperty({type: String})
    newData?: string;

    @ApiProperty({type: Boolean})
    success?: boolean;

    @ApiProperty({type: Number})
    userId?: number;

    @ApiProperty({type: String})
    ip?: string;
}
