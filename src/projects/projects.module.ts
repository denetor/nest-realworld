import {Logger, Module} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity.ts';

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    providers: [ProjectsService, Logger],
    controllers: [ProjectsController]
})
export class ProjectsModule {}
