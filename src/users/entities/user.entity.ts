import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    UpdateDateColumn,
    CreateDateColumn,
    BeforeInsert,
    OneToMany
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as argon2 from 'argon2';
import { Project } from '../../projects/entities/project.entity';
import {Exclude} from "class-transformer";

@Entity()
export class User {
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
        description: 'First name'
    })
    name: string;

    @Column({ nullable: true, default: '' })
    @ApiProperty({
        type: String,
        description: 'Last name'
    })
    lastName: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    @Index({ unique: true })
    @ApiProperty({
        type: String,
        description: 'Email address'
    })
    email: string;

    @Column({ nullable: true, default: null })
    @Exclude()
    @ApiProperty({
        type: String,
        description: 'Hashed password'
    })
    password: string;

    @Column({ type: 'bool', default: false, nullable: true })
    @ApiProperty({
        type: Boolean,
        description: 'If true, user must change password, after login'
    })
    mustChangePassword: boolean;

    @Column({ type: 'bool', default: false, nullable: true })
    @ApiProperty({
        type: Boolean,
        description: 'Accepted consent to use personal data to use the system'
    })
    technicalConsent: boolean;

    @Column({ type: 'bool', default: false, nullable: true })
    @ApiProperty({
        type: Boolean,
        description: 'Accepted consent for marketing purposes'
    })
    marketingConsent: boolean;

    @Column({ type: 'bool', default: false, nullable: true })
    @ApiProperty({
        type: Boolean,
        description: 'Accepted consent for profiling purpose'
    })
    profilingConsent: boolean;

    @Column({ type: 'bool', default: false, nullable: true })
    @ApiProperty({
        type: Boolean,
        description: 'If true, user is system administrator'
    })
    isAdmin: boolean;

    @Column({ nullable: true })
    @ApiProperty({
        type: String,
        description: 'Recovery password token'
    })
    resetPasswordToken: string;

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

    @Column({ type: 'timestamp', nullable: true })
    @ApiProperty({
        type: Date,
        description: 'last login'
    })
    lastLoginAt: Date;

    // before inserting new entities, hash password
    @BeforeInsert()
    async hashPassword() {
        // this.logger.log('@BeforeInsert User.hashPassword()');
        this.password = await argon2.hash(this.password);
    }

    // projects owned by this user
    @OneToMany(
        type => Project,
        project => project.owner
    )
    projects: Project[];
}
