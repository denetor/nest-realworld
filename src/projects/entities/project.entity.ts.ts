import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProjectDto } from '../dto/create-project.dto';

@Entity()
export class Project {
    constructor(dto: CreateProjectDto | undefined) {
        if (dto) {
            this.name = dto.name || '';
        }
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