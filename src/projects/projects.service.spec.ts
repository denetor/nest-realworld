import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { ProjectRepositoryMock } from './mocks/project-repository.mock';
import { Logger } from '../mocks/logger.mock';
import {Team} from "../teams/entities/team.entity";
import {UpdateTeamDto} from "../teams/dto/update-team.dto";
import {Project} from "./entities/project.entity";
import {UpdateProjectDto} from "./dto/update-project.dto";

describe('ProjectsService', () => {
    let service: ProjectsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProjectsService,
                {
                    provide: 'ProjectRepository',
                    useClass: ProjectRepositoryMock
                },
                Logger
            ]
        }).compile();

        service = module.get<ProjectsService>(ProjectsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should have methods defined', () => {
        expect(service.findAll).toBeDefined();
        expect(service.findOne).toBeDefined();
        expect(service.create).toBeDefined();
        expect(service.update).toBeDefined();
        expect(service.remove).toBeDefined();
    });

    it('findOne() should return an entity', async () => {
        const entity = await service.findOne(1);
        expect(entity.name).toBeDefined();
        expect(entity.name).toBe('Project Apollo');
    });

    it('findAll() should return an array', async () => {
        const entities = await service.findAll();
        expect(entities).toBeDefined();
        expect(entities[0]).toBeDefined();
        expect(entities[0].id).toBeDefined();
        expect(entities[0].id).toBe(1);
    });

    it('create() should return an entity', () => {
        const dto = new Project({ name: 'Project Manhattan' });
        const instance = service.create(dto).then(entity => {
            expect(typeof instance).toBe('Team');
        });
    });

    it('update() should return an entity', () => {
        const dto: UpdateProjectDto = { name: 'Project Manhattan' };
        service.update(1, dto).then(entity => {
            expect(typeof entity).toBe('Project');
        });
    });

    it('remove() should return an entity', () => {
        service.remove(1).then(entity => {
            expect(typeof entity).toBe('Project');
        });
    });
});
