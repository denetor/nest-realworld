import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProjectDto } from '../dto/create-project.dto';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Project {
    constructor(dto: CreateProjectDto | undefined) {
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

    // project owner
    @ManyToOne(
        () => User,
        user => user.projects
    )
    owner: User;
}
