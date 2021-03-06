import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CreateOrganizationDto } from '../dto/create-organization.dto';

@Entity()
export class Organization {
    constructor(dto: CreateOrganizationDto | undefined | null) {
        this.name = dto && dto.name ? dto.name : '';
    }

    @PrimaryGeneratedColumn()
    @ApiProperty({
        type: Number,
        description: 'Entity ID',
        minimum: 1
    })
    id: number;

    @Column({ nullable: true, default: '' })
    @ApiProperty({
        type: String,
        description: 'Name'
    })
    name: string;

    @CreateDateColumn()
    @ApiProperty({
        type: Date,
        description: 'Record creation date'
    })
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({
        type: Date,
        description: 'Record last update date'
    })
    updatedAt: Date;
}
