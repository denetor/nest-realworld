import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    providers: [ProjectsService, CaslAbilityFactory],
    controllers: [ProjectsController]
})
export class ProjectsModule {}
