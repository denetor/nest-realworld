import {BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AuditLogDto} from "../dto/audit-log.dto";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../users/entities/user.entity";

@Entity()
export class AuditLog {
    constructor(dto: AuditLogDto) {
        if (dto) {
            this.entity = dto.entity || '';
            this.operation = dto.operation || '';
            this.oldData = dto.oldData || '';
            this.newData = dto.newData || '';
            this.success = dto.success || null;
            this.ip = dto.ip || null;
        }
    }


    @PrimaryGeneratedColumn()
    @ApiProperty({
        type: Number,
        description: 'Entity ID',
        minimum: 1,
    })
    id: number;


    @Column({ nullable: false, default: '' })
    @ApiProperty({
        type: String,
        description: 'Entity type',
    })
    entity: string;


    @Column({ nullable: false, default: '' })
    @ApiProperty({
        type: String,
        description: 'Operation requested',
    })
    operation: string;


    @Column({ type: 'longtext', nullable: true })
    @ApiProperty({
        type: String,
        description: 'Data prior the operation (if appliable)',
    })
    oldData: string;

    @Column({ type: 'longtext', nullable: true })
    @ApiProperty({
        type: String,
        description: 'Data after the operation (if appliable)',
    })
    newData: string;

    @Column({ nullable: true, default: null })
    @ApiProperty({
        type: String,
        description: 'request ip address',
    })
    ip: string;


    @Column({ nullable: true, default: null })
    @ApiProperty({
        type: Boolean,
        description: 'If operation succeeded',
    })
    success: boolean;


    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false})
    @ApiProperty({
        type: Date,
        description: 'Record creation date',
    })
    createdAt: Date;


    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false})
    @ApiProperty({
        type: Date,
        description: 'Record last update date',
    })
    updatedAt: Date;


    @Column({nullable: true})
    @ApiProperty({
        type: Number,
        description: 'user ID',
    })
    userId: number;


    @ManyToOne(type => User)
    user!: User;


    @BeforeUpdate()
    setUpdatedAt() {
        this.updatedAt = new Date();
    }

}
